const HttpStatus = {
    OK: {code: 200, status: "Success"},
    CREATED: {code: 201, status: "Success"},
    NO_CONTENT: {code: 204, status: "NO_CONTENT"},
    BAD_REQUEST: {code: 400, status: "Bad Request"},
    NOT_FOUND: {code: 404, status: "Not Found"},
    INTERNAL_SERVER_ERROR: {code: 500, status: "INTERNAL_SERVER_ERROR"},
};

export default HttpStatus;
