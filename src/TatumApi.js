class TatumApi {
    constructor() {
        this.apiKey     = "t-64f72e0a0c34f3d88de8d429-a0b77a9c40504520a3871bc2";
        this.baseUrl    = 'https://api.tatum.io/v3';
        this.pageSize   = 5;
        this.offset     = 0;
    }

    /**
     * Helper method to build query string from params object
     */
    buildQueryParams(params) {
        if (!params) return '';
        return '?' + new URLSearchParams(params).toString();
    }

    /**
     * Make an API request
     * @param {string} endpoint - The API endpoint
     * @param {string} method - HTTP method (default: 'GET')
     * @param {Object} body - Request body for POST/PUT requests
     * @param {Object} params - Query parameters
     */
    async makeRequest(endpoint, method = 'GET', body = null, params = null) {
        const queryString = this.buildQueryParams(params);
        const url = `${this.baseUrl}${endpoint}${queryString}`;

        const headers = {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
        };
        console.log(url);
        const options = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                const errorTxt= await response.text();
                throw new Error(`Error: ${errorTxt}`);
            }
            return response.json();
        } catch (error) {
            console.error('Error making API request:', error.message);
            throw error; // Re-throw error for further handling
        }

    }
}

module.exports = TatumApi;
