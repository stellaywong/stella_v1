const path = require('path')



// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#onCreateNode
exports.onCreateNode = ({ node, actions }) => {
    const { createNode, createNodeField } = actions

    
    if (node.internal.type === 'MarkdownRemark') {
        const filePath = node.fileAbsolutePath.split("/");
        
        const category = filePath[filePath.length - 2];
        const slug = path.basename(node.fileAbsolutePath, '.md')

        createNodeField({
            node,
            name: 'slug',
            value: slug,
        })

        createNodeField({
            node,
            name: 'category',
            value: category,
        })
    }

    if (node.internal.type === 'ImageSharp') {
        console.log("node", node);
        console.log("actions", actions);
    }
}


// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const blogTemplate = path.resolve('./src/templates/poem.js')

    const res = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    res.data.allMarkdownRemark.edges.forEach((edge) => {
        createPage({
            component: blogTemplate,
            path: `/poem/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug,
            }
        })
    })
}


// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  
    // https://levelup.gitconnected.com/how-to-set-up-import-aliases-for-gatsby-32398ae67e7f
    actions.setWebpackConfig({
        resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@fonts': path.resolve(__dirname, 'src/fonts'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@templates': path.resolve(__dirname, 'src/templates'),
        },
        },
    });
};