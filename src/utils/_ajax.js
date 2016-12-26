import Layer from './_layer.js'

var Ajax = {
  /**
   * [enaiAjax description]
   * @param  {[type]} ajaxInfo {
   *                             url: string,
   *                             data: object,
   *                             success: function,
   *                             error: function,
   *                             fail: function,
   *                             cache: boolean.
   *                             cacheTime: timestamp (eg. 1473762600),
   *                             timeout: number (mm  eg.  30000)
   *                           }
   * @return {[type]}          [description]
   */
  enaiAjax(ajaxInfo) {
    if (!ajaxInfo.isStat) {
      Layer.unAlert()
    }
    if (ajaxInfo.unLoading !== true) {
      let text = ajaxInfo.loadingText || '加载中'
      Layer.loadingToast(text, ajaxInfo.loadingType)
    }
    var options = {
      url: ajaxInfo.url,
      type: ajaxInfo.type,
      dataType: ajaxInfo.dataType || 'json'
    }

    options.success = (data) => {
      if (ajaxInfo.unLoading !== true) {
        Layer.unLoading()
      }
      if (data.success) {
        ajaxInfo.success(data.data)
      } else {
        if (ajaxInfo.fail) {
          ajaxInfo.fail(data.error)
        } else {
          if (data.error) {
            Layer.unLoading()
            Layer.alert(data.error.message)
          }
        }
      }
    }

    if (ajaxInfo.error) {
      options.error = () => {
        if (ajaxInfo.unLoading !== true) {
          Layer.unLoading()
        }
        // Layer.unLoading()
        ajaxInfo.error()
      }
    } else {
      options.error = () => {
        Layer.unLoading()
        Layer.alert('网络不给力，请稍后再试')
      }
    }

    if (ajaxInfo.timeout !== undefined) {
      options.timeout = ajaxInfo.timeout
    } else {
      options.timeout = 30000
    }

    if (ajaxInfo.async !== undefined) {
      options.async = ajaxInfo.async
    }

    if (ajaxInfo.cache !== undefined) {
      options.cache = ajaxInfo.cache
    }

    if (ajaxInfo.data !== undefined) {
      options.data = ajaxInfo.data
    }

    if (ajaxInfo.beforeSend !== undefined) {
      options.beforeSend = ajaxInfo.beforeSend
    }

    if (ajaxInfo.complete !== undefined) {
      options.complete = ajaxInfo.complete
    }

    if (ajaxInfo.contentType !== undefined) {
      options.contentType = ajaxInfo.contentType
    }

    if (ajaxInfo.dataFilter !== undefined) {
      options.dataFilter = ajaxInfo.dataFilter
    }

    if (ajaxInfo.global !== undefined) {
      options.global = ajaxInfo.global
    }

    if (ajaxInfo.ifModified !== undefined) {
      options.ifModified = ajaxInfo.ifModified
    }

    if (ajaxInfo.jsonp !== undefined) {
      options.jsonp = ajaxInfo.jsonp
    }

    if (ajaxInfo.cache !== undefined) {
      options.cache = ajaxInfo.cache
    } else {
      options.cache = false
    }
    if (ajaxInfo.cacheTime !== undefined) {
      options.cacheTime = ajaxInfo.cacheTime
    }
    this.ajax(options)
  },
  ajax(options) {
    class AjaxObj {
      constructor(dataInfo) {
        dataInfo.type = dataInfo.type || 'get'
        this.request = null
        this.requestCounter = null
        this.cacheName = 'enai_data_cache'
        this.cacheTime = dataInfo.cacheTime
        this.isSendRequest = false
        this.sendInfo = {
          url: dataInfo.url,
          type: dataInfo.type,
          data: dataInfo.data,
          dataType: dataInfo.dataType,
          timeout: dataInfo.timeout || 3000,
          async: dataInfo.async,
          cache: dataInfo.cache
        }
        this.signArg = ['xea_channel', 'xea_net', 'irv', 'ts', 'sig', 'xea_app_ver', 'lang', 'callbackIndex', 'xea_os', 'access_token']
        this.error = (errorInfo) => {
          if (typeof dataInfo.error === 'function' && (!dataInfo.cache || this.isSendRequest)) {
            dataInfo.error(errorInfo)
          } else {
            var cache = this.getCache()
            if (cache) {
              dataInfo.success(cache)
            } else {
              dataInfo.error(errorInfo)
            }
          }
        }
        this.success = (successInfo) => {
          if (typeof dataInfo.success === 'function' && (!dataInfo.cache || this.isSendRequest)) {
            dataInfo.success(successInfo)
          } else {
            var cache = this.getCache()
            if (cache) {
              dataInfo.success(cache)
            } else {
              // fail
              dataInfo.success({
                success: false,
                data: null
              })
            }
          }
        }
        this.fail = (failInfo) => {
          if (typeof dataInfo.fail === 'function') {
            dataInfo.fail(failInfo)
          }
        }
        this.complete = () => {
          if (typeof dataInfo.complete === 'function') {
            dataInfo.complete(this.request)
          }
        }
      }
      createRequest() {
        this.request = new window.XMLHttpRequest()
        if (this.request === null) {
          this.error()
          return
        }
        this.initAndSend()
      }
      initAndSend() {
        this.checkCache()
        this.isSendRequest = false
        this.sendInfo.async = this.sendInfo.async === undefined || this.sendInfo.async === null || this.sendInfo.async
        this.sendInfo.data = ((obj) => {
          var str = ''
          for (var prop in obj) {
            let param = obj[prop]
            if (typeof param === 'object') {
              param = JSON.stringify(param)
            }
            str += prop + '=' + window.encodeURIComponent(param) + '&'
          }
          str = str.substring(0, str.length - 1)
          return str
        })(this.sendInfo.data)
        if (typeof this.sendInfo.type === 'undefined' || this.sendInfo.type.toLowerCase() === 'get') {
          this.sendInfo.type = 'get'
          if (this.sendInfo.data !== '') {
            this.sendInfo.url += '?' + this.sendInfo.data
          }
          this.sendInfo.data = null
        } else if (this.sendInfo.type.toLowerCase() === 'post') {
          // 如果cache 显示的为 false 则清除改域名下的所有cacheData
          if (typeof this.sendInfo.cache === 'boolean' && !this.sendInfo.cache) {
            this.clearCache()
          }
        }
        if (this.sendInfo.cache && this.getCache() && this.sendInfo.type.toLowerCase() !== 'post') {
          this.success()
          return
        }
        this.request.open(this.sendInfo.type, this.sendInfo.url, this.sendInfo.async)
        this.request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        this.request.send(this.sendInfo.data)
        this.handlerRequest()
        this.timeout()
        this.isSendRequest = true
      }
      timeout() {
        this.requestCounter = setTimeout(() => {
          if (this.request) {
            this.request.abort()
            this.error()
          }
        }, this.sendInfo.timeout)
      }
      handlerRequest() {
        this.request.onerror = (errInfo) => {
          this.error(errInfo)
        }
        this.request.onreadystatechange = () => {
          this.complete()
          if (this.request.readyState == 4 && this.request.status == 200) {
            clearTimeout(this.requestCounter)
            var returnInfo = this.request.responseText
            if (this.sendInfo.dataType.toLowerCase() === 'json') {
              returnInfo = JSON.parse(returnInfo)
            }
            this.success(returnInfo)
            if (this.sendInfo.type.toLowerCase() === 'get') {
              if (this.sendInfo.cache) {
                this.setCache(returnInfo)
              } else {
                this.removeCacheByKey()
              }
            }
            // if (resJson.success) {
            //   this.success(resJson.data)
            // } else {
            //   this.fail(resJson.data)
            // }
          } else if (this.request.status == 500) {
            this.error()
          }
        }
      }
      isInArray(val, arr) {
        return arr.indexOf(val) !== -1
      }
      cacheKeyWithoutSign(url) {
        var key = ''
        var arr1 = url.split('?')
        if (arr1.length > 1) {
          var arr2 = arr1[1].split('&')
          key = arr1[0] + '?'
          for (var k in arr2) {
            var arg = arr2[k]
            if (!this.isInArray(arg.split('=')[0], this.signArg)) {
              key += arg + '&'
            }
          }
          key = key.substring(0, key.length - 1)
        } else {
          key = arr1[0]
        }
        return key
      }
      getCache() {
        if (!window.localStorage) {
          return false
        }
        try {
          var localCache = window.localStorage.getItem(this.cacheName)
          var key = this.cacheKeyWithoutSign(this.sendInfo.url)
          return (localCache === null || localCache === undefined) ? false : JSON.parse(localCache)[key]
        } catch (e) {
          return false
        }
      }
      setCache(cacheData) {
        if (!window.localStorage) {
          return false
        }
        // (Math.floor((new Date).getTime() / 1000) + 1800)
        try {
          var cache = JSON.parse(window.localStorage.getItem(this.cacheName)) || {}
          var key = this.cacheKeyWithoutSign(this.sendInfo.url)
            // console.log(cache[key])
          cache[key] = cacheData
          if (typeof this.cacheTime === 'undefined') {
            let cacheTime = Math.floor((new Date).getTime() / 1000) + 1800
            cache[key].cacheTime = cacheTime
          } else {
            cache[key].cacheTime = this.cacheTime
          }
          window.localStorage.setItem(this.cacheName, JSON.stringify(cache))
          return true
        } catch (e) {
          return false
        }
      }
      clearCache() {
        if (!window.localStorage) {
          return false
        }
        window.localStorage.removeItem(this.cacheName)
      }
      removeCacheByKey() {
        if (!window.localStorage) {
          return false
        }
        try {
          var localCache = window.localStorage.getItem(this.cacheName)
          var key = this.cacheKeyWithoutSign(this.sendInfo.url)
          if (localCache !== null || localCache !== undefined) {
            localCache = JSON.parse(localCache)
            delete localCache[key]
            window.localStorage.setItem(this.cacheName, JSON.stringify(localCache))
          }
        } catch (e) {
          return false
        }
      }
      checkCache() {
        try {
          var localCache = window.localStorage.getItem(this.cacheName)
          var json = JSON.parse(localCache)
          var dateNow = Math.floor((new Date).getTime() / 1000)
          var currKey = this.cacheKeyWithoutSign(this.sendInfo.url)
          for (let key in json) {
            let item = json[key]
            if (item.cacheTime) {
              if (currKey === key && typeof this.cacheTime !== 'undefined' && dateNow < this.cacheTime && item.cacheTime !== this.cacheTime) {
                item.cacheTime = this.cacheTime
              }
              if (dateNow > item.cacheTime && currKey === key) {
                delete json[key]
              }
            }
            if (!this.sendInfo.cache && currKey === key) {
              delete json[key]
            }
          }
          window.localStorage.setItem(this.cacheName, JSON.stringify(json))
        } catch (e) {}
      }
    }
    var myajax = new AjaxObj(options)
    myajax.createRequest()
  }
}

export default Ajax
