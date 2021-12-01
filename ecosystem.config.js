module.exports = {
    apps: [
        {
            name: "main",
            script: "dist/main.js",
            watch: true,
            env: {
                "NODE_ENV": "production",
                "POSTGRES_HOST": "localhost",
                "POSTGRES_USER": "postgres",
                "POSTGRES_PASSWORD": "postgres",
                "POSTGRES_PORT": "5432",
                "POSTGRES_DB": "postgres",
                "ADMIN_USERNAME": "daniapog",
                "ADMIN_PASSWORD": "daniapog"
            }
        }
    ]
}
