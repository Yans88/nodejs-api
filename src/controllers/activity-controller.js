import database from "../db-connection.js";
import httpStatus from "../responses/http-status.js";
import Response from "../responses/response.js";
import logger from "../utils/loggerr.js";

const dates = new Date().toISOString();
const date = dates.replace(/T/, " ").replace(/\..+/, "");

export const getAllData = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching data activity`);
    const sql = `SELECT * FROM activity where deleted_at is null`;
    database.query(sql, (error, results) => {
        if (!results) {
            res
                .status(httpStatus.OK.code)
                .send(new Response(httpStatus.OK.status, `Not found`, results));
        } else {
            res
                .status(httpStatus.OK.code)
                .send(
                    new Response(httpStatus.OK.status, httpStatus.OK.status, results)
                );
        }
    });
};

export const getOneData = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, get single data activity`);
    const sqlGetId = `SELECT * FROM activity WHERE id = ? and deleted_at is null`;
    database.query(sqlGetId, [req.params.id], (error, results) => {
        if (!results[0]) {
            res
                .status(httpStatus.OK.code)
                .send(
                    new Response(
                        httpStatus.NOT_FOUND.status,
                        `Activity with ID ${req.params.id} Not Found`,
                        {}
                    )
                );
        } else {
            res
                .status(httpStatus.OK.code)
                .send(
                    new Response(httpStatus.OK.status, httpStatus.OK.status, results[0])
                );
        }
    });
};

export const saveData = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, save data activity`);
    const {email, title} = req.body;
    if (!title) {
        res
            .status(httpStatus.BAD_REQUEST.code)
            .send(
                new Response(httpStatus.BAD_REQUEST.status, `title cannot be null`, {})
            );
    } else {
        const sql = `INSERT INTO activity(title, email, created_at) VALUES (?, ?, ?)`;
        database.query(sql, [title, email, date, date], (error, results) => {
            if (!results) {
                res
                    .status(httpStatus.INTERNAL_SERVER_ERROR.code)
                    .send(
                        new Response(
                            httpStatus.INTERNAL_SERVER_ERROR.status,
                            httpStatus.INTERNAL_SERVER_ERROR.status,
                            `Error occurred`
                        )
                    );
            } else {
                const resDt = {
                    created_at: dates,
                    updated_at: dates,
                    id: results.insertId,
                    ...req.body,
                };
                res
                    .status(httpStatus.CREATED.code)
                    .send(
                        new Response(
                            httpStatus.CREATED.status,
                            httpStatus.CREATED.status,
                            resDt
                        )
                    );
            }
        });
    }
};

export const updateData = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, update data activity`);
    const {title} = req.body;
    if (!title) {
        res
            .status(httpStatus.BAD_REQUEST.code)
            .send(
                new Response(httpStatus.BAD_REQUEST.status, `title cannot be null`, {})
            );
    } else {
        const sql = `UPDATE activity SET title = ? WHERE id = ? and deleted_at is null`;
        database.query(sql, [title, req.params.id], (error, results) => {
            if (results.affectedRows > 0) {
                const sqlGetId = `SELECT * FROM activity WHERE id = ?`;
                database.query(sqlGetId, [req.params.id], (error, results) => {
                    res
                        .status(httpStatus.OK.code)
                        .send(
                            new Response(
                                httpStatus.OK.status,
                                httpStatus.OK.status,
                                results[0]
                            )
                        );
                });
            } else {
                res
                    .status(httpStatus.NOT_FOUND.code)
                    .send(
                        new Response(
                            httpStatus.NOT_FOUND.status,
                            `Activity with ID ${req.params.id} Not Found`
                        )
                    );
            }
        });
    }
};

export const deleteData = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, delete data activity`);
    const sql = `UPDATE activity SET deleted_at = ? WHERE id = ? and deleted_at is null`;
    database.query(sql, [date, req.params.id], (error, results) => {
        if (results.affectedRows > 0) {
            res
                .status(httpStatus.OK.code)
                .send(new Response(httpStatus.OK.status, httpStatus.OK.status, {}));
        } else {
            res
                .status(httpStatus.NOT_FOUND.code)
                .send(
                    new Response(
                        httpStatus.NOT_FOUND.status,
                        `Activity with ID ${req.params.id} Not Found`
                    )
                );
        }
    });
};

//Data Todo List

export const getAllDataTodo = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching data todo`);
    const {activity_group_id} = req.query;
    let sql = `SELECT * FROM todo_list where deleted_at is null`;
    if (activity_group_id) sql += ` and activity_group_id=${activity_group_id}`;
    database.query(sql, (error, results) => {
        if (!results) {
            res
                .status(httpStatus.OK.code)
                .send(
                    new Response(httpStatus.OK.status, httpStatus.OK.status, `Not found`)
                );
        } else {
            res
                .status(httpStatus.OK.code)
                .send(
                    new Response(httpStatus.OK.status, httpStatus.OK.status, results)
                );
        }
    });
};

export const saveDataTodo = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, save data todo`);
    const {activity_group_id, title} = req.body;
    if (!title) {
        res
            .status(httpStatus.BAD_REQUEST.code)
            .send(
                new Response(httpStatus.BAD_REQUEST.status, `title cannot be null`, {})
            );
    } else {
        const sql = `INSERT INTO todo_list(title, activity_group_id, created_at) VALUES (?, ?, ?)`;
        database.query(
            sql,
            [title, activity_group_id, date, date],
            (error, results) => {
                if (!results) {
                    res
                        .status(httpStatus.INTERNAL_SERVER_ERROR.code)
                        .send(
                            new Response(
                                httpStatus.INTERNAL_SERVER_ERROR.status,
                                httpStatus.INTERNAL_SERVER_ERROR.status,
                                `Error occurred`
                            )
                        );
                } else {
                    const resDt = {
                        created_at: dates,
                        updated_at: dates,
                        id: results.insertId,
                        ...req.body,
                    };
                    res
                        .status(httpStatus.CREATED.code)
                        .send(
                            new Response(
                                httpStatus.CREATED.status,
                                httpStatus.CREATED.status,
                                resDt
                            )
                        );
                }
            }
        );
    }
};

export const deleteDataTodo = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, delete data todo`);
    const sql = `UPDATE todo_list SET deleted_at = ? WHERE id = ? and deleted_at is null`;
    database.query(sql, [date, req.params.id], (error, results) => {
        if (results.affectedRows > 0) {
            res
                .status(httpStatus.OK.code)
                .send(new Response(httpStatus.OK.status, httpStatus.OK.status, {}));
        } else {
            res
                .status(httpStatus.NOT_FOUND.code)
                .send(
                    new Response(
                        httpStatus.NOT_FOUND.status,
                        `Todo with ID ${req.params.id} Not Found`
                    )
                );
        }
    });
};

export const updateDataTodo = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, update data todo`);
    const {title} = req.body;
    if (!title) {
        res
            .status(httpStatus.BAD_REQUEST.code)
            .send(
                new Response(httpStatus.BAD_REQUEST.status, `title cannot be null`, {})
            );
    } else {
        const sql = `UPDATE todo_list SET title = ? WHERE id = ? and deleted_at is null`;
        database.query(sql, [title, req.params.id], (error, results) => {
            if (results.affectedRows > 0) {
                const sqlGetId = `SELECT * FROM todo_list WHERE id = ?`;
                database.query(sqlGetId, [req.params.id], (error, results) => {
                    res
                        .status(httpStatus.OK.code)
                        .send(
                            new Response(
                                httpStatus.OK.status,
                                httpStatus.OK.status,
                                results[0]
                            )
                        );
                });
            } else {
                res
                    .status(httpStatus.NOT_FOUND.code)
                    .send(
                        new Response(
                            httpStatus.NOT_FOUND.status,
                            `Todo with ID ${req.params.id} Not Found`
                        )
                    );
            }
        });
    }
};

export const getOneDataTodo = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, get single data todo`);
    const sqlGetId = `SELECT * FROM todo_list WHERE id = ? and deleted_at is null`;
    database.query(sqlGetId, [req.params.id], (error, results) => {
        if (!results[0]) {
            res
                .status(httpStatus.OK.code)
                .send(
                    new Response(
                        httpStatus.NOT_FOUND.status,
                        `Todo with ID ${req.params.id} Not Found`,
                        {}
                    )
                );
        } else {
            res
                .status(httpStatus.OK.code)
                .send(
                    new Response(httpStatus.OK.status, httpStatus.OK.status, results[0])
                );
        }
    });
};
