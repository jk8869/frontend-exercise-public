const Api = {
    github: {
        url: 'https://api.github.com/search/users',
        queryParameterKey: 'q',
        perPageParameterKey: 'per_page', 
        key: 'github'
    },
    gorest: {
        url: 'https://gorest.co.in/public/v1/users',
        queryParameterKey: 'name',        
        key: 'gorest'
    },
};

export default Api;