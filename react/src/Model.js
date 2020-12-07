const server = 'http://localhost:5000'

// export function sendInitial() {
//     let url = server + '/initial'
// }

export default class Model {
    async initial(recorded_result) {

        //send initials

        //get results url 
        let url = server + '/initial_results'
        return url
    }
}