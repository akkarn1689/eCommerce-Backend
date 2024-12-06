import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: "3.0.0", // Specify OpenAPI version
        info: {
            title: "Ecommerce Backend",
            version: "1.0.0",
            description: "API documentation for your project",
            contact: {
                name: "GOAT Services",
                email: "your_email@example.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000", // Replace with your server URL
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [
        "./src/modules/auth/auth.routes.js",
        "./src/modules/address/address.routes.js",
        "./src/modules/brand/brand.routes.js",
        "./src/modules/cart/cart.routes.js",
        "./src/modules/category/category.routes.js",
        "./src/modules/coupon/coupon.routes.js",
        "./src/modules/order/order.routes.js",
        "./src/modules/product/product.routes.js",
        "./src/modules/review/review.routes.js",
        "./src/modules/subcategory/subcategory.routes.js",
        "./src/modules/user/user.routes.js",
        "./src/modules/wishlist/wishlist.routes.js",
    ],
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger documentation available at /api-docs");
};
