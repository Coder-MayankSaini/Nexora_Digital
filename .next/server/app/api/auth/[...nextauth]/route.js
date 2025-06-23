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
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// Create NextAuth handler\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_1___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_0__.authOptions);\n// Export as GET and POST handlers for App Router with proper typing\nasync function GET(request, context) {\n    const params = await context.params;\n    return handler(request, {\n        params\n    });\n}\nasync function POST(request, context) {\n    const params = await context.params;\n    return handler(request, {\n        params\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUF3QztBQUNSO0FBRWhDLDBCQUEwQjtBQUMxQixNQUFNRSxVQUFVRCxnREFBUUEsQ0FBQ0Qsa0RBQVdBO0FBRXBDLG9FQUFvRTtBQUM3RCxlQUFlRyxJQUFJQyxPQUFnQixFQUFFQyxPQUFvRDtJQUM5RixNQUFNQyxTQUFTLE1BQU1ELFFBQVFDLE1BQU07SUFDbkMsT0FBT0osUUFBUUUsU0FBUztRQUFFRTtJQUFPO0FBQ25DO0FBRU8sZUFBZUMsS0FBS0gsT0FBZ0IsRUFBRUMsT0FBb0Q7SUFDL0YsTUFBTUMsU0FBUyxNQUFNRCxRQUFRQyxNQUFNO0lBQ25DLE9BQU9KLFFBQVFFLFNBQVM7UUFBRUU7SUFBTztBQUNuQyIsInNvdXJjZXMiOlsiL1VzZXJzL21hYy9Eb3dubG9hZHMvTmV4b3JhX0RpZ2l0YWwvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiQC9saWIvYXV0aFwiXG5pbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiXG5cbi8vIENyZWF0ZSBOZXh0QXV0aCBoYW5kbGVyXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpXG5cbi8vIEV4cG9ydCBhcyBHRVQgYW5kIFBPU1QgaGFuZGxlcnMgZm9yIEFwcCBSb3V0ZXIgd2l0aCBwcm9wZXIgdHlwaW5nXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IFJlcXVlc3QsIGNvbnRleHQ6IHsgcGFyYW1zOiBQcm9taXNlPHsgbmV4dGF1dGg6IHN0cmluZ1tdIH0+IH0pIHtcbiAgY29uc3QgcGFyYW1zID0gYXdhaXQgY29udGV4dC5wYXJhbXM7XG4gIHJldHVybiBoYW5kbGVyKHJlcXVlc3QsIHsgcGFyYW1zIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0LCBjb250ZXh0OiB7IHBhcmFtczogUHJvbWlzZTx7IG5leHRhdXRoOiBzdHJpbmdbXSB9PiB9KSB7XG4gIGNvbnN0IHBhcmFtcyA9IGF3YWl0IGNvbnRleHQucGFyYW1zO1xuICByZXR1cm4gaGFuZGxlcihyZXF1ZXN0LCB7IHBhcmFtcyB9KTtcbn0gIl0sIm5hbWVzIjpbImF1dGhPcHRpb25zIiwiTmV4dEF1dGgiLCJoYW5kbGVyIiwiR0VUIiwicmVxdWVzdCIsImNvbnRleHQiLCJwYXJhbXMiLCJQT1NUIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID || \"dummy-client-id\",\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET || \"dummy-client-secret\"\n        }),\n        // Admin credentials provider - ONLY for admin access\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Admin Credentials\",\n            credentials: {\n                username: {\n                    label: \"Username\",\n                    type: \"text\",\n                    placeholder: \"admin username\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\",\n                    placeholder: \"admin password\"\n                }\n            },\n            async authorize (credentials) {\n                console.log(\"Authorize called with credentials:\", {\n                    username: credentials?.username,\n                    hasPassword: !!credentials?.password\n                });\n                // Only check for admin credentials - NO other users allowed\n                const adminUsername = process.env.ADMIN_USERNAME || \"admin\";\n                const adminPassword = process.env.ADMIN_PASSWORD || \"maybrain\";\n                console.log(\"Expected credentials:\", {\n                    username: adminUsername,\n                    hasPassword: !!adminPassword\n                });\n                if (credentials?.username === adminUsername && credentials?.password === adminPassword) {\n                    console.log(\"Admin credentials verified successfully\");\n                    return {\n                        id: \"admin-user\",\n                        name: \"Administrator\",\n                        email: \"admin@nexoradigital.live\",\n                        role: \"ADMIN\"\n                    };\n                }\n                console.log(\"Invalid credentials provided\");\n                // Return null for any other credentials - NO OTHER USERS ALLOWED\n                return null;\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            // Add role to JWT token\n            if (user) {\n                token.role = user.role;\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            // Add user id and role to session from token\n            if (session?.user && token) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                // Additional security check - only allow ADMIN role\n                if (token.role !== \"ADMIN\") {\n                    throw new Error(\"Unauthorized access\");\n                }\n            }\n            return session;\n        },\n        async signIn ({ user }) {\n            // Only allow sign in for admin users\n            return user?.role === \"ADMIN\";\n        }\n    },\n    pages: {\n        signIn: '/admin-login',\n        error: '/auth/error'\n    },\n    session: {\n        strategy: 'jwt',\n        maxAge: 24 * 60 * 60\n    },\n    // Add a secret for JWT - ensure it exists\n    secret: process.env.NEXTAUTH_SECRET || \"fallback-secret-for-dev-only-change-in-production-b3b4b07f-405b-49df-936b-0794733a6fbe\",\n    debug: \"development\" === 'development'\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDdUQ7QUFDVTtBQUUxRCxNQUFNRSxjQUErQjtJQUMxQ0MsV0FBVztRQUNUSCxzRUFBY0EsQ0FBQztZQUNiSSxVQUFVQyxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQixJQUFJO1lBQzFDQyxjQUFjSCxRQUFRQyxHQUFHLENBQUNHLG9CQUFvQixJQUFJO1FBQ3BEO1FBQ0EscURBQXFEO1FBQ3JEUiwyRUFBbUJBLENBQUM7WUFDbEJTLE1BQU07WUFDTkMsYUFBYTtnQkFDWEMsVUFBVTtvQkFBRUMsT0FBTztvQkFBWUMsTUFBTTtvQkFBUUMsYUFBYTtnQkFBaUI7Z0JBQzNFQyxVQUFVO29CQUFFSCxPQUFPO29CQUFZQyxNQUFNO29CQUFZQyxhQUFhO2dCQUFpQjtZQUNqRjtZQUNBLE1BQU1FLFdBQVVOLFdBQVc7Z0JBQ3pCTyxRQUFRQyxHQUFHLENBQUMsc0NBQXNDO29CQUFFUCxVQUFVRCxhQUFhQztvQkFBVVEsYUFBYSxDQUFDLENBQUNULGFBQWFLO2dCQUFTO2dCQUUxSCw0REFBNEQ7Z0JBQzVELE1BQU1LLGdCQUFnQmhCLFFBQVFDLEdBQUcsQ0FBQ2dCLGNBQWMsSUFBSTtnQkFDcEQsTUFBTUMsZ0JBQWdCbEIsUUFBUUMsR0FBRyxDQUFDa0IsY0FBYyxJQUFJO2dCQUVwRE4sUUFBUUMsR0FBRyxDQUFDLHlCQUF5QjtvQkFBRVAsVUFBVVM7b0JBQWVELGFBQWEsQ0FBQyxDQUFDRztnQkFBYztnQkFFN0YsSUFBSVosYUFBYUMsYUFBYVMsaUJBQWlCVixhQUFhSyxhQUFhTyxlQUFlO29CQUN0RkwsUUFBUUMsR0FBRyxDQUFDO29CQUNaLE9BQU87d0JBQ0xNLElBQUk7d0JBQ0pmLE1BQU07d0JBQ05nQixPQUFPO3dCQUNQQyxNQUFNO29CQUNSO2dCQUNGO2dCQUVBVCxRQUFRQyxHQUFHLENBQUM7Z0JBQ1osaUVBQWlFO2dCQUNqRSxPQUFPO1lBQ1Q7UUFDRjtLQUNEO0lBQ0RTLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRUMsSUFBSSxFQUFFO1lBQ3ZCLHdCQUF3QjtZQUN4QixJQUFJQSxNQUFNO2dCQUNSRCxNQUFNSCxJQUFJLEdBQUcsS0FBY0EsSUFBSTtnQkFDL0JHLE1BQU1MLEVBQUUsR0FBR00sS0FBS04sRUFBRTtZQUNwQjtZQUNBLE9BQU9LO1FBQ1Q7UUFDQSxNQUFNRSxTQUFRLEVBQUVBLE9BQU8sRUFBRUYsS0FBSyxFQUFFO1lBQzlCLDZDQUE2QztZQUM3QyxJQUFJRSxTQUFTRCxRQUFRRCxPQUFPO2dCQUN6QkUsUUFBUUQsSUFBSSxDQUFTTixFQUFFLEdBQUdLLE1BQU1MLEVBQUU7Z0JBQ2xDTyxRQUFRRCxJQUFJLENBQVNKLElBQUksR0FBR0csTUFBTUgsSUFBSTtnQkFFdkMsb0RBQW9EO2dCQUNwRCxJQUFJRyxNQUFNSCxJQUFJLEtBQUssU0FBUztvQkFDMUIsTUFBTSxJQUFJTSxNQUFNO2dCQUNsQjtZQUNGO1lBQ0EsT0FBT0Q7UUFDVDtRQUNBLE1BQU1FLFFBQU8sRUFBRUgsSUFBSSxFQUFFO1lBQ25CLHFDQUFxQztZQUNyQyxPQUFPLE1BQWVKLFNBQVM7UUFDakM7SUFDRjtJQUNBUSxPQUFPO1FBQ0xELFFBQVE7UUFDUkUsT0FBTztJQUNUO0lBQ0FKLFNBQVM7UUFDUEssVUFBVTtRQUNWQyxRQUFRLEtBQUssS0FBSztJQUNwQjtJQUNBLDBDQUEwQztJQUMxQ0MsUUFBUWxDLFFBQVFDLEdBQUcsQ0FBQ2tDLGVBQWUsSUFBSTtJQUN2Q0MsT0FBT3BDLGtCQUF5QjtBQUNsQyxFQUFDIiwic291cmNlcyI6WyIvVXNlcnMvbWFjL0Rvd25sb2Fkcy9OZXhvcmFfRGlnaXRhbC9saWIvYXV0aC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tIFwibmV4dC1hdXRoXCJcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIlxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIlxuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQgfHwgXCJkdW1teS1jbGllbnQtaWRcIixcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQgfHwgXCJkdW1teS1jbGllbnQtc2VjcmV0XCIsXG4gICAgfSksXG4gICAgLy8gQWRtaW4gY3JlZGVudGlhbHMgcHJvdmlkZXIgLSBPTkxZIGZvciBhZG1pbiBhY2Nlc3NcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6IFwiQWRtaW4gQ3JlZGVudGlhbHNcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIHVzZXJuYW1lOiB7IGxhYmVsOiBcIlVzZXJuYW1lXCIsIHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJhZG1pbiB1c2VybmFtZVwiIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiYWRtaW4gcGFzc3dvcmRcIiB9XG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXV0aG9yaXplIGNhbGxlZCB3aXRoIGNyZWRlbnRpYWxzOlwiLCB7IHVzZXJuYW1lOiBjcmVkZW50aWFscz8udXNlcm5hbWUsIGhhc1Bhc3N3b3JkOiAhIWNyZWRlbnRpYWxzPy5wYXNzd29yZCB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIE9ubHkgY2hlY2sgZm9yIGFkbWluIGNyZWRlbnRpYWxzIC0gTk8gb3RoZXIgdXNlcnMgYWxsb3dlZFxuICAgICAgICBjb25zdCBhZG1pblVzZXJuYW1lID0gcHJvY2Vzcy5lbnYuQURNSU5fVVNFUk5BTUUgfHwgXCJhZG1pblwiO1xuICAgICAgICBjb25zdCBhZG1pblBhc3N3b3JkID0gcHJvY2Vzcy5lbnYuQURNSU5fUEFTU1dPUkQgfHwgXCJtYXlicmFpblwiO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCJFeHBlY3RlZCBjcmVkZW50aWFsczpcIiwgeyB1c2VybmFtZTogYWRtaW5Vc2VybmFtZSwgaGFzUGFzc3dvcmQ6ICEhYWRtaW5QYXNzd29yZCB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjcmVkZW50aWFscz8udXNlcm5hbWUgPT09IGFkbWluVXNlcm5hbWUgJiYgY3JlZGVudGlhbHM/LnBhc3N3b3JkID09PSBhZG1pblBhc3N3b3JkKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJBZG1pbiBjcmVkZW50aWFscyB2ZXJpZmllZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBcImFkbWluLXVzZXJcIixcbiAgICAgICAgICAgIG5hbWU6IFwiQWRtaW5pc3RyYXRvclwiLFxuICAgICAgICAgICAgZW1haWw6IFwiYWRtaW5AbmV4b3JhZGlnaXRhbC5saXZlXCIsXG4gICAgICAgICAgICByb2xlOiBcIkFETUlOXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW52YWxpZCBjcmVkZW50aWFscyBwcm92aWRlZFwiKTtcbiAgICAgICAgLy8gUmV0dXJuIG51bGwgZm9yIGFueSBvdGhlciBjcmVkZW50aWFscyAtIE5PIE9USEVSIFVTRVJTIEFMTE9XRURcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSlcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgLy8gQWRkIHJvbGUgdG8gSldUIHRva2VuXG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5yb2xlID0gKHVzZXIgYXMgYW55KS5yb2xlO1xuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgLy8gQWRkIHVzZXIgaWQgYW5kIHJvbGUgdG8gc2Vzc2lvbiBmcm9tIHRva2VuXG4gICAgICBpZiAoc2Vzc2lvbj8udXNlciAmJiB0b2tlbikge1xuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmc7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmc7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGRpdGlvbmFsIHNlY3VyaXR5IGNoZWNrIC0gb25seSBhbGxvdyBBRE1JTiByb2xlXG4gICAgICAgIGlmICh0b2tlbi5yb2xlICE9PSBcIkFETUlOXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmF1dGhvcml6ZWQgYWNjZXNzXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9LFxuICAgIGFzeW5jIHNpZ25Jbih7IHVzZXIgfSkge1xuICAgICAgLy8gT25seSBhbGxvdyBzaWduIGluIGZvciBhZG1pbiB1c2Vyc1xuICAgICAgcmV0dXJuICh1c2VyIGFzIGFueSk/LnJvbGUgPT09IFwiQURNSU5cIjtcbiAgICB9LFxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogJy9hZG1pbi1sb2dpbicsXG4gICAgZXJyb3I6ICcvYXV0aC9lcnJvcicsXG4gIH0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogJ2p3dCcsXG4gICAgbWF4QWdlOiAyNCAqIDYwICogNjAsIC8vIDI0IGhvdXJzXG4gIH0sXG4gIC8vIEFkZCBhIHNlY3JldCBmb3IgSldUIC0gZW5zdXJlIGl0IGV4aXN0c1xuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCB8fCBcImZhbGxiYWNrLXNlY3JldC1mb3ItZGV2LW9ubHktY2hhbmdlLWluLXByb2R1Y3Rpb24tYjNiNGIwN2YtNDA1Yi00OWRmLTkzNmItMDc5NDczM2E2ZmJlXCIsXG4gIGRlYnVnOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyxcbn0gIl0sIm5hbWVzIjpbIkdvb2dsZVByb3ZpZGVyIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwibmFtZSIsImNyZWRlbnRpYWxzIiwidXNlcm5hbWUiLCJsYWJlbCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiY29uc29sZSIsImxvZyIsImhhc1Bhc3N3b3JkIiwiYWRtaW5Vc2VybmFtZSIsIkFETUlOX1VTRVJOQU1FIiwiYWRtaW5QYXNzd29yZCIsIkFETUlOX1BBU1NXT1JEIiwiaWQiLCJlbWFpbCIsInJvbGUiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInVzZXIiLCJzZXNzaW9uIiwiRXJyb3IiLCJzaWduSW4iLCJwYWdlcyIsImVycm9yIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJzZWNyZXQiLCJORVhUQVVUSF9TRUNSRVQiLCJkZWJ1ZyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_mac_Downloads_Nexora_Digital_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/Users/mac/Downloads/Nexora_Digital/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_mac_Downloads_Nexora_Digital_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm1hYyUyRkRvd25sb2FkcyUyRk5leG9yYV9EaWdpdGFsJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm1hYyUyRkRvd25sb2FkcyUyRk5leG9yYV9EaWdpdGFsJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN1QjtBQUNwRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL21hYy9Eb3dubG9hZHMvTmV4b3JhX0RpZ2l0YWwvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL21hYy9Eb3dubG9hZHMvTmV4b3JhX0RpZ2l0YWwvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmac%2FDownloads%2FNexora_Digital&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();