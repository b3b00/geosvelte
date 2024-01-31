[source](https://medium.com/medialesson/debug-angular-apps-locally-with-a-self-signed-ssl-certificate-98191581bc83)

# self-signed certificate generation

```
openssl genrsa -out server.key
openssl req -new -key server.key -out csr1.pem -config server.cnf
openssl x509 -req -days 9999 -in csr1.pem -signkey server.key -out server.crt -extensions req_ext -extfile server.cnf
rm csr1.pem
```

# install certificate on windows

 1. double click the server.crt file
 2. click [install certificate]
 3. select "current user" > [Next]
 4. select "place all cert in the following store".  > click [Browse...] 
 5. select "Trusted root certificate authorities" 
 6. done.

# install certificate on linux

[Adding Trusted Root Certificates to the Server](https://support.kerioconnect.gfi.com/hc/en-us/articles/360015200119-Adding-Trusted-Root-Certificates-to-the-Server)