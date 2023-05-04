import requests from './request'

export const Login = () => {
  return requests({
    url: '/login',
    method: 'post',
    data: params
  })
}
