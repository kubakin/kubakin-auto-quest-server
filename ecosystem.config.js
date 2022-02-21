module.exports = {
    apps: [
        {
            name: "main",
            script: "dist/main.js",
            watch: true,
            env: {
                "POSTGRES_HOST": "db",
                "POSTGRES_USER": "app",
                "POSTGRES_PASSWORD": "secret",
                "POSTGRES_PORT": "5432",
                "POSTGRES_DB": "app",
                "ADMIN_USERNAME": "daniapog",
                "ADMIN_PASSWORD": "daniapog",
                "PORT": "3000"
            }
        }
    ]
}
