const http = require('http')
const fs = require('fs')
const crypto = require('crypto')
const zlib = require('zlib')
let CONF = {}

main()

function main() {
    if (!fs.existsSync('passwords'))
        fs.mkdirSync('passwords')

    CONF = JSON.parse(fs.readFileSync('conf.json').toString())
    const server = http.createServer(request_listener)
    server.listen(CONF.port, CONF.host, () => console.log('server listening at ', `${CONF.host}:${CONF.port}`))
}

async function request_listener(request, socket) {
    request.url = parse_url(request)
    try {
        serve(socket, await router(request))
    } catch(e) {
        serve(socket, internal_error(e))
    }
}

const authorise = f => request => {
    if (request.headers.password !== CONF.password) throw 'unauthorised'
    else return f(request)
}

function internal_error(e) {
    console.error(e)
    return {
        status: 500,
        headers: { 'Content-Type': 'text/plain' },
        data: e.message,
    }
}

function not_found() {
    return {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
        data: 'not found',
    }
}

function method_not_allowed() {
    return {
        status: 405,
        headers: { 'Content-Type': 'text/plain' },
        data: 'method not allowed',
    }
}

function serve(socket, response) {
    response.headers['content-encoding'] = 'gzip'
    socket.writeHead(response.status, response.headers)
    const gzip = zlib.createGzip({ level: 9 })
    gzip.end(response.data)
    gzip.pipe(socket)
}

function parse_url(request) {
    let path = ''
    for (let i = 0; i < request.url.length; i++) {
        const x = request.url[i]
        if (x !== '?' && x !== '#')
            path += x
    }
    return path
}

async function router(request) {
    switch (request.method) {
        case 'GET':
            if (request.url === '/')
                return serve_file('./public/index.html')
            else if (request.url === '/passwords')
                return list_passwords(request)
            else return serve_file('./public' + request.url)
        case 'POST':
            if (request.url === '/passwords')
                return create_password(request)
            else if (request.url === '/authorise')
                return test_authorise(request)
            else return method_not_allowed()
        case 'PUT':
            if (request.url.startsWith('/passwords/'))
                return upsert_password(request)
            else return method_not_allowed()
    }
}

function file_extension(pathname) {
    const index = pathname.lastIndexOf('.')
    if (index === -1) return pathname
    else return pathname.slice(index + 1)
}

const MIMES = {
    'html': 'text/html',
}

function guess_mime_type(pathname) {
    const extension = file_extension(pathname)
    const mime = MIMES[extension]
    if (mime) return mime
    else return 'application/octet-stream'
}

function serve_file(pathname) {
    try {
        fs.accessSync(pathname, fs.constants.R_OK)
        return {
            status: 200,
            headers: { 'Content-Type': guess_mime_type(pathname) },
            data: fs.readFileSync(pathname)
        }
    } catch (e) { return not_found() }
}

function read_post_data(request) {
    return new Promise((yes, no) => {
        const chunks = []
        request.on('data', x => chunks.push(x))
        request.on('end', x => yes(Buffer.concat(chunks)))
    })
}

const create_password = authorise(async function create_password(request) {
    const data = await read_post_data(request)
    const pathname = 'passwords/' + crypto.randomUUID()
    fs.writeFileSync(pathname, data)
    return {
        status: 201,
        headers: { 'Content-Type': 'text/plain' },
        data: 'Created ' + pathname,
    }
})

const upsert_password = authorise(async function upsert_password(request) {
    const data = await read_post_data(request)
    const uuid = request.url.slice('/passwords/'.length)
    const pathname = 'passwords/' + uuid
    fs.writeFileSync(pathname, data)
    return {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
        data: 'Updated ' + pathname,
    }
})

const list_passwords = authorise(function list_passwords() {
    const files = Object.fromEntries(
        fs.readdirSync('passwords')
        .map(x => [x, JSON.parse(fs.readFileSync('passwords/' + x).toString()) ]))
    return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(files)
    }
})

const test_authorise = authorise(() => ({ status: 200, headers: { 'Content-Type': 'text/plain' }, data: 'authorised' }))
