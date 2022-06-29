const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
    if(phase === PHASE_DEVELOPMENT_SERVER){
        return{
            env: {
                mongodb_username: 'rabino',
                mongodb_password: 'MongoloDB123',
                mongodb_clustername: 'comments'
            }
        };
    }
    return {
        env: {
            mongodb_username: 'rabino',
            mongodb_password: 'MongoloDB123',
            mongodb_clustername: 'comments'
        }
    };    
}