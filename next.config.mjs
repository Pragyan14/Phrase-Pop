// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     webpack(config) {
//         config.module.rules.push({
//             test: /\.(woff|woff2|eot|ttf|otf)$/i,
//             issuer: { and: [/\.(js|ts|md)x?$/] },
//             type: 'asset/resource',
//         });
//         return config;
//     },
// };
//
// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev, isServer }) => {
        // Existing font loader configuration
        config.module.rules.push({
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            issuer: { and: [/\.(js|ts|md)x?$/] },
            type: 'asset/resource',
        });

        // Optimize source maps in production
        if (!dev && !isServer) {
            config.devtool = 'source-map';
        }

        return config;
    },
    // Disable source maps in production
    productionBrowserSourceMaps: false,
};

export default nextConfig;