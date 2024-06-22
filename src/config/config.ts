
export default () => ({
    database: {
        host : process.env.POSTGRESQL_ADDON_HOST,
        port : parseInt(process.env.POSTGRESQL_ADDON_PORT),
        username : process.env.POSTGRESQL_ADDON_USER,
        password : process.env.POSTGRESQL_ADDON_PASSWORD,
        db : process.env.POSTGRESQL_ADDON_DB,
    }
})