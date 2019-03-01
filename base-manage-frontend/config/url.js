import env from './env'

const DEV_URL = 'http://192.168.36.109:8300/mock/5c1af2d63c08bc00219c9cb5/fiber'
const PRO_URL = 'http://192.168.36.109:8300/mock/5c1af2d63c08bc00219c9cb5/fiber'

export default env === 'development' ? DEV_URL : PRO_URL
