# Zencastr Caching Service

This repo contains a simple API based caching service. It's implemented in Node.js/Typescript and provides the abillity to cache key/value pairs comprised of strings.

```
key: 'example key', value: 'example value'
```





## Getting Started

Fork/Clone the main repository. Once you have it locally, you can run it on docker via:

```
docker-compose up
```

The API is available locally : http://localhost:8080/

## Usage

The API allows you to get, set, and delete from the cache.

`POST /` 

    {
        "key": "example key",
        "val": "example value"
    }

### Response
    Status: 200 OK

`GET /:key`


### Response
    Status: 200 OK
    example value

`DELETE /:key`


### Response
    Status: 200 OK

## Approach
I used two data structures to build the cache, a hash map and linked list. They allow for a straightforward LRU cache implementation, using the hash map for O(1) get/set while the linked list is used to keep track of recency.

Further implementation details/comments can be found in the code. 



## Libraries

* [string-hash](https://www.npmjs.com/package/string-hash) - Javascript hashing function
* [express](https://www.npmjs.com/package/express) - Web framework
* [body-parser](https://www.npmjs.com/package/body-parser) - Node.js middleware



## Authors

* **Jason Yang** - https://github.com/projectyang
