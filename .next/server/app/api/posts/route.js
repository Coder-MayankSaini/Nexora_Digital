/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/posts/route";
exports.ids = ["app/api/posts/route"];
exports.modules = {

/***/ "(rsc)/./app/api/posts/route.ts":
/*!********************************!*\
  !*** ./app/api/posts/route.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! slugify */ \"(rsc)/./node_modules/slugify/slugify.js\");\n/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(slugify__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nasync function GET() {\n    try {\n        const posts = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.post.findMany({\n            where: {\n                status: 'PUBLISHED'\n            },\n            select: {\n                id: true,\n                title: true,\n                slug: true,\n                featuredImage: true,\n                featuredImageAlt: true,\n                seoDescription: true,\n                publishedAt: true,\n                author: {\n                    select: {\n                        name: true,\n                        image: true\n                    }\n                }\n            },\n            orderBy: {\n                publishedAt: 'desc'\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            posts\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error('Error fetching posts:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to fetch posts'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        // Check if user is authenticated and has required role\n        if (!session?.user || ![\n            'EDITOR',\n            'ADMIN'\n        ].includes(session.user.role)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Unauthorized'\n            }, {\n                status: 401\n            });\n        }\n        const data = await request.json();\n        const { title, content, featuredImage, featuredImageAlt, seoTitle, seoDescription, keywords, status } = data;\n        // Generate a unique slug from title\n        let slug = slugify__WEBPACK_IMPORTED_MODULE_4___default()(title, {\n            lower: true,\n            strict: true\n        });\n        // Check if slug already exists\n        const existingPost = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.post.findUnique({\n            where: {\n                slug\n            }\n        });\n        // If slug exists, append a random string\n        if (existingPost) {\n            slug = `${slug}-${Math.random().toString(36).substring(2, 8)}`;\n        }\n        // Create the post\n        const post = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.post.create({\n            data: {\n                title,\n                content,\n                slug,\n                featuredImage,\n                featuredImageAlt,\n                seoTitle: seoTitle || title,\n                seoDescription,\n                keywords: keywords ? JSON.stringify(keywords) : null,\n                status: status || 'DRAFT',\n                publishedAt: status === 'PUBLISHED' ? new Date() : null,\n                authorId: session.user.id\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            post\n        }, {\n            status: 201\n        });\n    } catch (error) {\n        console.error('Error creating post:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to create post'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dEI7WUFBRUMsT0FBTztRQUF3QixHQUNqQztZQUFFZCxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL21hYy9Eb3dubG9hZHMvTmV4b3JhX0RpZ2l0YWwvYXBwL2FwaS9wb3N0cy9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJ0AvbGliL3ByaXNtYSdcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tICduZXh0LWF1dGgnXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgnXG5pbXBvcnQgc2x1Z2lmeSBmcm9tICdzbHVnaWZ5J1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHBvc3RzID0gYXdhaXQgcHJpc21hLnBvc3QuZmluZE1hbnkoe1xuICAgICAgd2hlcmU6IHsgc3RhdHVzOiAnUFVCTElTSEVEJyB9LFxuICAgICAgc2VsZWN0OiB7XG4gICAgICAgIGlkOiB0cnVlLFxuICAgICAgICB0aXRsZTogdHJ1ZSxcbiAgICAgICAgc2x1ZzogdHJ1ZSxcbiAgICAgICAgZmVhdHVyZWRJbWFnZTogdHJ1ZSxcbiAgICAgICAgZmVhdHVyZWRJbWFnZUFsdDogdHJ1ZSxcbiAgICAgICAgc2VvRGVzY3JpcHRpb246IHRydWUsXG4gICAgICAgIHB1Ymxpc2hlZEF0OiB0cnVlLFxuICAgICAgICBhdXRob3I6IHtcbiAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvcmRlckJ5OiB7XG4gICAgICAgIHB1Ymxpc2hlZEF0OiAnZGVzYydcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgcG9zdHMgfSwgeyBzdGF0dXM6IDIwMCB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHBvc3RzOicsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6ICdGYWlsZWQgdG8gZmV0Y2ggcG9zdHMnIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxuICAgIFxuICAgIC8vIENoZWNrIGlmIHVzZXIgaXMgYXV0aGVudGljYXRlZCBhbmQgaGFzIHJlcXVpcmVkIHJvbGVcbiAgICBpZiAoIXNlc3Npb24/LnVzZXIgfHwgIVsnRURJVE9SJywgJ0FETUlOJ10uaW5jbHVkZXMoc2Vzc2lvbi51c2VyLnJvbGUgYXMgc3RyaW5nKSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LFxuICAgICAgICB7IHN0YXR1czogNDAxIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVxdWVzdC5qc29uKClcbiAgICBjb25zdCB7IHRpdGxlLCBjb250ZW50LCBmZWF0dXJlZEltYWdlLCBmZWF0dXJlZEltYWdlQWx0LCBzZW9UaXRsZSwgc2VvRGVzY3JpcHRpb24sIGtleXdvcmRzLCBzdGF0dXMgfSA9IGRhdGFcbiAgICBcbiAgICAvLyBHZW5lcmF0ZSBhIHVuaXF1ZSBzbHVnIGZyb20gdGl0bGVcbiAgICBsZXQgc2x1ZyA9IHNsdWdpZnkodGl0bGUsIHsgbG93ZXI6IHRydWUsIHN0cmljdDogdHJ1ZSB9KVxuICAgIFxuICAgIC8vIENoZWNrIGlmIHNsdWcgYWxyZWFkeSBleGlzdHNcbiAgICBjb25zdCBleGlzdGluZ1Bvc3QgPSBhd2FpdCBwcmlzbWEucG9zdC5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IHNsdWcgfVxuICAgIH0pXG4gICAgXG4gICAgLy8gSWYgc2x1ZyBleGlzdHMsIGFwcGVuZCBhIHJhbmRvbSBzdHJpbmdcbiAgICBpZiAoZXhpc3RpbmdQb3N0KSB7XG4gICAgICBzbHVnID0gYCR7c2x1Z30tJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgOCl9YFxuICAgIH1cbiAgICBcbiAgICAvLyBDcmVhdGUgdGhlIHBvc3RcbiAgICBjb25zdCBwb3N0ID0gYXdhaXQgcHJpc21hLnBvc3QuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgIHNsdWcsXG4gICAgICAgIGZlYXR1cmVkSW1hZ2UsXG4gICAgICAgIGZlYXR1cmVkSW1hZ2VBbHQsXG4gICAgICAgIHNlb1RpdGxlOiBzZW9UaXRsZSB8fCB0aXRsZSxcbiAgICAgICAgc2VvRGVzY3JpcHRpb24sXG4gICAgICAgIGtleXdvcmRzOiBrZXl3b3JkcyA/IEpTT04uc3RyaW5naWZ5KGtleXdvcmRzKSA6IG51bGwsXG4gICAgICAgIHN0YXR1czogc3RhdHVzIHx8ICdEUkFGVCcsXG4gICAgICAgIHB1Ymxpc2hlZEF0OiBzdGF0dXMgPT09ICdQVUJMSVNIRUQnID8gbmV3IERhdGUoKSA6IG51bGwsXG4gICAgICAgIGF1dGhvcklkOiBzZXNzaW9uLnVzZXIuaWRcbiAgICAgIH1cbiAgICB9KVxuICAgIFxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHBvc3QgfSwgeyBzdGF0dXM6IDIwMSB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNyZWF0aW5nIHBvc3Q6JywgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0ZhaWxlZCB0byBjcmVhdGUgcG9zdCcgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgIClcbiAgfVxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwic2x1Z2lmeSIsIkdFVCIsInBvc3RzIiwicG9zdCIsImZpbmRNYW55Iiwid2hlcmUiLCJzdGF0dXMiLCJzZWxlY3QiLCJpZCIsInRpdGxlIiwic2x1ZyIsImZlYXR1cmVkSW1hZ2UiLCJmZWF0dXJlZEltYWdlQWx0Iiwic2VvRGVzY3JpcHRpb24iLCJwdWJsaXNoZWRBdCIsImF1dGhvciIsIm5hbWUiLCJpbWFnZSIsIm9yZGVyQnkiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwiUE9TVCIsInJlcXVlc3QiLCJzZXNzaW9uIiwidXNlciIsImluY2x1ZGVzIiwicm9sZSIsImRhdGEiLCJjb250ZW50Iiwic2VvVGl0bGUiLCJrZXl3b3JkcyIsImxvd2VyIiwic3RyaWN0IiwiZXhpc3RpbmdQb3N0IiwiZmluZFVuaXF1ZSIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0cmluZyIsImNyZWF0ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJEYXRlIiwiYXV0aG9ySWQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/posts/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID || \"dummy-client-id\",\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET || \"dummy-client-secret\"\n        }),\n        // Admin credentials provider - ONLY for admin access\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Admin Credentials\",\n            credentials: {\n                username: {\n                    label: \"Username\",\n                    type: \"text\",\n                    placeholder: \"admin username\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\",\n                    placeholder: \"admin password\"\n                }\n            },\n            async authorize (credentials) {\n                console.log(\"Authorize called with credentials:\", {\n                    username: credentials?.username,\n                    hasPassword: !!credentials?.password\n                });\n                // Only check for admin credentials - NO other users allowed\n                const adminUsername = process.env.ADMIN_USERNAME || \"admin\";\n                const adminPassword = process.env.ADMIN_PASSWORD || \"maybrain\";\n                console.log(\"Expected credentials:\", {\n                    username: adminUsername,\n                    hasPassword: !!adminPassword\n                });\n                if (credentials?.username === adminUsername && credentials?.password === adminPassword) {\n                    console.log(\"Admin credentials verified successfully\");\n                    return {\n                        id: \"admin-user\",\n                        name: \"Administrator\",\n                        email: \"admin@nexoradigital.live\",\n                        role: \"ADMIN\"\n                    };\n                }\n                console.log(\"Invalid credentials provided\");\n                // Return null for any other credentials - NO OTHER USERS ALLOWED\n                return null;\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            // Add role to JWT token\n            if (user) {\n                token.role = user.role;\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            // Add user id and role to session from token\n            if (session?.user && token) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                // Additional security check - only allow ADMIN role\n                if (token.role !== \"ADMIN\") {\n                    throw new Error(\"Unauthorized access\");\n                }\n            }\n            return session;\n        },\n        async signIn ({ user }) {\n            // Only allow sign in for admin users\n            return user?.role === \"ADMIN\";\n        }\n    },\n    pages: {\n        signIn: '/admin-login',\n        error: '/auth/error'\n    },\n    session: {\n        strategy: 'jwt',\n        maxAge: 24 * 60 * 60\n    },\n    // Add a secret for JWT - ensure it exists\n    secret: process.env.NEXTAUTH_SECRET || \"fallback-secret-for-dev-only-change-in-production-b3b4b07f-405b-49df-936b-0794733a6fbe\",\n    debug: \"development\" === 'development'\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDdUQ7QUFDVTtBQUUxRCxNQUFNRSxjQUErQjtJQUMxQ0MsV0FBVztRQUNUSCxzRUFBY0EsQ0FBQztZQUNiSSxVQUFVQyxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQixJQUFJO1lBQzFDQyxjQUFjSCxRQUFRQyxHQUFHLENBQUNHLG9CQUFvQixJQUFJO1FBQ3BEO1FBQ0EscURBQXFEO1FBQ3JEUiwyRUFBbUJBLENBQUM7WUFDbEJTLE1BQU07WUFDTkMsYUFBYTtnQkFDWEMsVUFBVTtvQkFBRUMsT0FBTztvQkFBWUMsTUFBTTtvQkFBUUMsYUFBYTtnQkFBaUI7Z0JBQzNFQyxVQUFVO29CQUFFSCxPQUFPO29CQUFZQyxNQUFNO29CQUFZQyxhQUFhO2dCQUFpQjtZQUNqRjtZQUNBLE1BQU1FLFdBQVVOLFdBQVc7Z0JBQ3pCTyxRQUFRQyxHQUFHLENBQUMsc0NBQXNDO29CQUFFUCxVQUFVRCxhQUFhQztvQkFBVVEsYUFBYSxDQUFDLENBQUNULGFBQWFLO2dCQUFTO2dCQUUxSCw0REFBNEQ7Z0JBQzVELE1BQU1LLGdCQUFnQmhCLFFBQVFDLEdBQUcsQ0FBQ2dCLGNBQWMsSUFBSTtnQkFDcEQsTUFBTUMsZ0JBQWdCbEIsUUFBUUMsR0FBRyxDQUFDa0IsY0FBYyxJQUFJO2dCQUVwRE4sUUFBUUMsR0FBRyxDQUFDLHlCQUF5QjtvQkFBRVAsVUFBVVM7b0JBQWVELGFBQWEsQ0FBQyxDQUFDRztnQkFBYztnQkFFN0YsSUFBSVosYUFBYUMsYUFBYVMsaUJBQWlCVixhQUFhSyxhQUFhTyxlQUFlO29CQUN0RkwsUUFBUUMsR0FBRyxDQUFDO29CQUNaLE9BQU87d0JBQ0xNLElBQUk7d0JBQ0pmLE1BQU07d0JBQ05nQixPQUFPO3dCQUNQQyxNQUFNO29CQUNSO2dCQUNGO2dCQUVBVCxRQUFRQyxHQUFHLENBQUM7Z0JBQ1osaUVBQWlFO2dCQUNqRSxPQUFPO1lBQ1Q7UUFDRjtLQUNEO0lBQ0RTLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRUMsSUFBSSxFQUFFO1lBQ3ZCLHdCQUF3QjtZQUN4QixJQUFJQSxNQUFNO2dCQUNSRCxNQUFNSCxJQUFJLEdBQUcsS0FBY0EsSUFBSTtnQkFDL0JHLE1BQU1MLEVBQUUsR0FBR00sS0FBS04sRUFBRTtZQUNwQjtZQUNBLE9BQU9LO1FBQ1Q7UUFDQSxNQUFNRSxTQUFRLEVBQUVBLE9BQU8sRUFBRUYsS0FBSyxFQUFFO1lBQzlCLDZDQUE2QztZQUM3QyxJQUFJRSxTQUFTRCxRQUFRRCxPQUFPO2dCQUN6QkUsUUFBUUQsSUFBSSxDQUFTTixFQUFFLEdBQUdLLE1BQU1MLEVBQUU7Z0JBQ2xDTyxRQUFRRCxJQUFJLENBQVNKLElBQUksR0FBR0csTUFBTUgsSUFBSTtnQkFFdkMsb0RBQW9EO2dCQUNwRCxJQUFJRyxNQUFNSCxJQUFJLEtBQUssU0FBUztvQkFDMUIsTUFBTSxJQUFJTSxNQUFNO2dCQUNsQjtZQUNGO1lBQ0EsT0FBT0Q7UUFDVDtRQUNBLE1BQU1FLFFBQU8sRUFBRUgsSUFBSSxFQUFFO1lBQ25CLHFDQUFxQztZQUNyQyxPQUFPLE1BQWVKLFNBQVM7UUFDakM7SUFDRjtJQUNBUSxPQUFPO1FBQ0xELFFBQVE7UUFDUkUsT0FBTztJQUNUO0lBQ0FKLFNBQVM7UUFDUEssVUFBVTtRQUNWQyxRQUFRLEtBQUssS0FBSztJQUNwQjtJQUNBLDBDQUEwQztJQUMxQ0MsUUFBUWxDLFFBQVFDLEdBQUcsQ0FBQ2tDLGVBQWUsSUFBSTtJQUN2Q0MsT0FBT3BDLGtCQUF5QjtBQUNsQyxFQUFDIiwic291cmNlcyI6WyIvVXNlcnMvbWFjL0Rvd25sb2Fkcy9OZXhvcmFfRGlnaXRhbC9saWIvYXV0aC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tIFwibmV4dC1hdXRoXCJcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIlxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIlxuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQgfHwgXCJkdW1teS1jbGllbnQtaWRcIixcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQgfHwgXCJkdW1teS1jbGllbnQtc2VjcmV0XCIsXG4gICAgfSksXG4gICAgLy8gQWRtaW4gY3JlZGVudGlhbHMgcHJvdmlkZXIgLSBPTkxZIGZvciBhZG1pbiBhY2Nlc3NcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6IFwiQWRtaW4gQ3JlZGVudGlhbHNcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIHVzZXJuYW1lOiB7IGxhYmVsOiBcIlVzZXJuYW1lXCIsIHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJhZG1pbiB1c2VybmFtZVwiIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiYWRtaW4gcGFzc3dvcmRcIiB9XG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXV0aG9yaXplIGNhbGxlZCB3aXRoIGNyZWRlbnRpYWxzOlwiLCB7IHVzZXJuYW1lOiBjcmVkZW50aWFscz8udXNlcm5hbWUsIGhhc1Bhc3N3b3JkOiAhIWNyZWRlbnRpYWxzPy5wYXNzd29yZCB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIE9ubHkgY2hlY2sgZm9yIGFkbWluIGNyZWRlbnRpYWxzIC0gTk8gb3RoZXIgdXNlcnMgYWxsb3dlZFxuICAgICAgICBjb25zdCBhZG1pblVzZXJuYW1lID0gcHJvY2Vzcy5lbnYuQURNSU5fVVNFUk5BTUUgfHwgXCJhZG1pblwiO1xuICAgICAgICBjb25zdCBhZG1pblBhc3N3b3JkID0gcHJvY2Vzcy5lbnYuQURNSU5fUEFTU1dPUkQgfHwgXCJtYXlicmFpblwiO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCJFeHBlY3RlZCBjcmVkZW50aWFsczpcIiwgeyB1c2VybmFtZTogYWRtaW5Vc2VybmFtZSwgaGFzUGFzc3dvcmQ6ICEhYWRtaW5QYXNzd29yZCB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjcmVkZW50aWFscz8udXNlcm5hbWUgPT09IGFkbWluVXNlcm5hbWUgJiYgY3JlZGVudGlhbHM/LnBhc3N3b3JkID09PSBhZG1pblBhc3N3b3JkKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJBZG1pbiBjcmVkZW50aWFscyB2ZXJpZmllZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBcImFkbWluLXVzZXJcIixcbiAgICAgICAgICAgIG5hbWU6IFwiQWRtaW5pc3RyYXRvclwiLFxuICAgICAgICAgICAgZW1haWw6IFwiYWRtaW5AbmV4b3JhZGlnaXRhbC5saXZlXCIsXG4gICAgICAgICAgICByb2xlOiBcIkFETUlOXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW52YWxpZCBjcmVkZW50aWFscyBwcm92aWRlZFwiKTtcbiAgICAgICAgLy8gUmV0dXJuIG51bGwgZm9yIGFueSBvdGhlciBjcmVkZW50aWFscyAtIE5PIE9USEVSIFVTRVJTIEFMTE9XRURcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSlcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgLy8gQWRkIHJvbGUgdG8gSldUIHRva2VuXG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5yb2xlID0gKHVzZXIgYXMgYW55KS5yb2xlO1xuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgLy8gQWRkIHVzZXIgaWQgYW5kIHJvbGUgdG8gc2Vzc2lvbiBmcm9tIHRva2VuXG4gICAgICBpZiAoc2Vzc2lvbj8udXNlciAmJiB0b2tlbikge1xuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmc7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmc7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGRpdGlvbmFsIHNlY3VyaXR5IGNoZWNrIC0gb25seSBhbGxvdyBBRE1JTiByb2xlXG4gICAgICAgIGlmICh0b2tlbi5yb2xlICE9PSBcIkFETUlOXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWQgYWNjZXNzXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9LFxuICAgIGFzeW5jIHNpZ25Jbih7IHVzZXIgfSkge1xuICAgICAgLy8gT25seSBhbGxvdyBzaWduIGluIGZvciBhZG1pbiB1c2Vyc1xuICAgICAgcmV0dXJuICh1c2VyIGFzIGFueSk/LnJvbGUgPT09IFwiQURNSU5cIjtcbiAgICB9LFxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogJy9hZG1pbi1sb2dpbicsXG4gICAgZXJyb3I6ICcvYXV0aC9lcnJvcicsXG4gIH0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogJ2p3dCcsXG4gICAgbWF4QWdlOiAyNCAqIDYwICogNjAsIC8vIDI0IGhvdXJzXG4gIH0sXG4gIC8vIEFkZCBhIHNlY3JldCBmb3IgSldUIC0gZW5zdXJlIGl0IGV4aXN0c1xuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCB8fCBcImZhbGxiYWNrLXNlY3JldC1mb3ItZGV2LW9ubHktY2hhbmdlLWluLXByb2R1Y3Rpb24tYjNiNGIwN2YtNDA1Yi00OWRmLTkzNmItMDc5NDczM2E2ZmJlXCIsXG4gIGRlYnVnOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyxcbn0gIl0sIm5hbWVzIjpbIkdvb2dsZVByb3ZpZGVyIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwibmFtZSIsImNyZWRlbnRpYWxzIiwidXNlcm5hbWUiLCJsYWJlbCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiY29uc29sZSIsImxvZyIsImhhc1Bhc3N3b3JkIiwiYWRtaW5Vc2VybmFtZSIsIkFETUlOX1VTRVJOQU1FIiwiYWRtaW5QYXNzd29yZCIsIkFETUlOX1BBU1NXT1JEIiwiaWQiLCJlbWFpbCIsInJvbGUiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInVzZXIiLCJzZXNzaW9uIiwiRXJyb3IiLCJzaWduSW4iLCJwYWdlcyIsImVycm9yIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJzZWNyZXQiLCJORVhUQVVUSF9TRUNSRVQiLCJkZWJ1ZyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\n// PrismaClient is attached to the `global` object in development to prevent\n// exhausting your database connection limit.\n// Learn more: https://pris.ly/d/help/next-js-best-practices\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        'query',\n        'error',\n        'warn'\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3Qyw0RUFBNEU7QUFDNUUsNkNBQTZDO0FBQzdDLDREQUE0RDtBQUU1RCxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLO1FBQUM7UUFBUztRQUFTO0tBQU87QUFDakMsR0FBRTtBQUVKLElBQUlDLElBQXFDLEVBQUVKLGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsiL1VzZXJzL21hYy9Eb3dubG9hZHMvTmV4b3JhX0RpZ2l0YWwvbGliL3ByaXNtYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcblxuLy8gUHJpc21hQ2xpZW50IGlzIGF0dGFjaGVkIHRvIHRoZSBgZ2xvYmFsYCBvYmplY3QgaW4gZGV2ZWxvcG1lbnQgdG8gcHJldmVudFxuLy8gZXhoYXVzdGluZyB5b3VyIGRhdGFiYXNlIGNvbm5lY3Rpb24gbGltaXQuXG4vLyBMZWFybiBtb3JlOiBodHRwczovL3ByaXMubHkvZC9oZWxwL25leHQtanMtYmVzdC1wcmFjdGljZXNcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsIGFzIHVua25vd24gYXMgeyBwcmlzbWE6IFByaXNtYUNsaWVudCB9XG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hIHx8XG4gIG5ldyBQcmlzbWFDbGllbnQoe1xuICAgIGxvZzogWydxdWVyeScsICdlcnJvcicsICd3YXJuJ10sXG4gIH0pXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hICJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWwiLCJwcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fposts%2Froute&page=%2Fapi%2Fposts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2Froute.ts&appDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fposts%2Froute&page=%2Fapi%2Fposts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2Froute.ts&appDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_mac_Downloads_Nexora_Digital_app_api_posts_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/posts/route.ts */ \"(rsc)/./app/api/posts/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/posts/route\",\n        pathname: \"/api/posts\",\n        filename: \"route\",\n        bundlePath: \"app/api/posts/route\"\n    },\n    resolvedPagePath: \"/Users/mac/Downloads/Nexora_Digital/app/api/posts/route.ts\",\n    nextConfigOutput,\n    userland: _Users_mac_Downloads_Nexora_Digital_app_api_posts_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwb3N0cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcG9zdHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZwb3N0cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm1hYyUyRkRvd25sb2FkcyUyRk5leG9yYV9EaWdpdGFsJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm1hYyUyRkRvd25sb2FkcyUyRk5leG9yYV9EaWdpdGFsJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNVO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbWFjL0Rvd25sb2Fkcy9OZXhvcmFfRGlnaXRhbC9hcHAvYXBpL3Bvc3RzL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9wb3N0cy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3Bvc3RzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9wb3N0cy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9tYWMvRG93bmxvYWRzL05leG9yYV9EaWdpdGFsL2FwcC9hcGkvcG9zdHMvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fposts%2Froute&page=%2Fapi%2Fposts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2Froute.ts&appDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/oidc-token-hash","vendor-chunks/slugify","vendor-chunks/preact","vendor-chunks/object-hash","vendor-chunks/lru-cache","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fposts%2Froute&page=%2Fapi%2Fposts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fposts%2Froute.ts&appDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();