#!/bin/sh

# run the build
rm -rf public/js
npm run build

# put files in proper directory for DEB file generation
basename='password-server'
timestamp=$(date '+%s')
dirname="$basename"_"$timestamp"_amd64
mkdir -p $dirname/opt/$basename
mkdir -p $dirname/opt/$basename/passwords
mkdir -p $dirname/opt/$basename/public
mkdir -p $dirname/etc/systemd/system
cp -pr --parents conf.json index.js public $dirname/opt/$basename
cp -pr password-server.service $dirname/etc/systemd/system
cp -pr DEBIAN $dirname
chmod 755 $dirname/DEBIAN
sed -i s/VERSION/$timestamp/ $dirname/DEBIAN/control

# make the deb file
dpkg-deb --build --root-owner-group $dirname

# cleanup
rm -rf $dirname
