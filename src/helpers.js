self.group = function group(f, xs) {
    return xs.reduce((xs, x) => {
        const g = f(x)
        if (xs[g] === undefined) xs[g] = []
        xs[g].push(x)
        return xs
    }, ({}))
}

self.by = f => (a, b) => f(a) < f(b) ? -1 : 1
self.has = a => b => b.includes(a)
self.inside = a => b => a.includes(b)

export default {}
