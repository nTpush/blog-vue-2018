let API_HOSTNAME
if (process.env.NODE_ENV === 'production') {
  API_HOSTNAME = 'http://118.24.194.224:20001'
} else {
  API_HOSTNAME = 'http://new-practice.local'
}
const root = {
  // httpUrl: 'http://47.98.171.72:8081/',
  // httpUrl: 'http://118.24.194.224:20001',
  httpUrl: API_HOSTNAME,
  httpHost: 'api'

}
export default root
