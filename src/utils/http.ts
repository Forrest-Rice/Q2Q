/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-12-16 18:28:07
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-16 19:07:59
 * @FilePath: \Q2Q\src\utils\http.ts
 * @Description: HTTP
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
import type { HttpClientConfig, RequestParams } from 'axios-mapper'
import { Method } from 'axios-mapper'
import { ElMessage } from 'element-plus'
import type { DEL_MODEL, GET_MODEL, POST_MODEL, PUT_MODEL } from '~/model'

const config: HttpClientConfig = {
  baseURL: 'http://26.26.26.1:3000',
  headers: { },
}

const https = new HttpClient(config)

/**
 * @description: 响应拦截器
 * @param {*} res 响应数据
 * @param {*} error
 * @return {*}
 */
https.httpClient.interceptors.response.use(res => res, (error) => {
  ElMessage({ message: '服务器异常', type: 'error' })
  return Promise.reject(error)
})

/**
 * @description: 请求拦截器
 * @param {*} config 请求配置
 * @param {*} error Error
 * @return {*}
 */
https.httpClient.interceptors.request.use(config => config, (error: any) => {
  ElMessage({ message: '服务器异常', type: 'error' })
  return Promise.reject(error)
})

/**
 * @description: post 请求
 * @param {string} url
 * @param {RequestParams} data
 * @return {*}
 */
export const post = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<POST_MODEL>(url, Method.POST, data).then((response: any) => {
      resolve(response?.data)
    }, (err: any) => { reject(err) })
  })
}

/**
 * @description: get 请求
 * @param {string} url
 * @param {RequestParams} data
 * @return {*}
 */
export const get = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<GET_MODEL>(url, Method.GET, data).then((response: any) => {
      resolve(response)
    }, (err: any) => { reject(err) })
  })
}

/**
 * @description: put请求
 * @param {string} url
 * @param {RequestParams} data
 * @return {*}
 */
export const put = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<PUT_MODEL>(url, Method.PUT, data).then((response: any) => {
      resolve(response?.data)
    }, (err: any) => { reject(err) })
  })
}

/**
 * @description: del请求
 * @param {string} url
 * @param {RequestParams} data
 * @return {*}
 */
export const del = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<DEL_MODEL>(url, Method.DELETE, data).then((response: any) => {
      resolve(response?.data)
    }, (err: any) => { reject(err) })
  })
}
