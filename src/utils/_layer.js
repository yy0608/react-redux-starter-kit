import '../styles/layer.scss'
var Layer = {
  msg_id: 0,
  alert (text, onlyOne = false) {
    if (onlyOne) {
      let alerts = document.querySelectorAll('.msg-alert')
      for (let i = 0; i < alerts.length; i++) {
        if (alerts[i] !== null) {
          alerts[i].parentNode.removeChild(alerts[i])
        }
      }
      alerts = null
    }
    var id = 'msg_alert_' + this.msg_id++
    var html = '<div class="msg-alert">' + text + '</div>'
    var div = document.createElement('div')
    div.classList.add('msg-alert')
    div.textContent = text
    div.setAttribute('id', id)
    document.body.appendChild(div)
    setTimeout(() => {
      var deleteDom = document.querySelector('#' + id)
      if (deleteDom !== null) {
        deleteDom.parentNode.removeChild(deleteDom)
      }
    }, 2200)
  },
  unAlert () {
    var deleteDoms = document.querySelectorAll('.msg-alert')
    for (let i = 0; i < deleteDoms.length; i++) {
      if (deleteDoms[i] !== null) {
        deleteDoms[i].parentNode.removeChild(deleteDoms[i])
      }
    }
  },
  alertDialog ({title, content, btn}) {
    var id = 'msg_alert_' + this.msg_id++
    var html = '<div class="weui_dialog_alert"><div class="weui_mask"></div><div class="weui_dialog">'
    if (title) {
      html += '<div class="weui_dialog_hd"><strong class="weui_dialog_title">'+ title +'</strong></div>'
    }
    html += '<div class="weui_dialog_bd">' + content + '</div>'
    html += '<div class="weui_dialog_ft"><a href="javascript:;" class="weui_btn_dialog primary define-btn">' + btn + '</a></div></div></div>'
    var div = document.createElement('div')
    div.setAttribute('id', id)
    div.innerHTML = html
    document.body.appendChild(div)
    var _alertDialog = document.querySelector('#' + id)
    _alertDialog.querySelector('.define-btn').addEventListener('click', () => {
      if (_alertDialog !== null) {
        _alertDialog.parentNode.removeChild(_alertDialog)
      }
    }, false)
    _alertDialog.addEventListener('touchmove', e => {
      e.preventDefault()
    }, false)
  },
  /**
   * 加载 loading
   * @param  {[type]} msg  [内容]
   * @param  {[type]} type [1： 微信， 2：iOS]
   * @return {[type]}      [description]
   */
  loadingToast (msg , type = 1) {
    if (type === 1) {
      var div_s = ''
      for (let i = 0; i < 12; i++) {
        div_s += '<div class="weui_loading_leaf weui_loading_leaf_' + i + '"></div>'
      }
      var div = document.createElement('div')
      div.setAttribute('id', 'loading')
      div.classList.add('weui_loading_toast')
      div.innerHTML = '<div class="weui_mask_transparent"></div> <div class="weui_toast"> <div class="weui_loading">' + div_s + '</div> <p class="weui_toast_content">' + msg + '</p> </div>'
      document.body.appendChild(div)
    } else if (type === 2) {
      var div = document.createElement('div')
      div.classList.add('loading')
      div.setAttribute('id', 'loading')
      document.body.appendChild(div)
    }
  },
  unLoading () {
    var loading = document.querySelector('#loading')
    if (loading !== null) {
      loading.parentNode.removeChild(loading)
    }
  },
  alertToast (text) {
    var id = 'msg_alert_toast_' + this.msg_id++
    var html = document.createElement('div')
    html.setAttribute('id', id)
    html.innerHTML = '<div class="weui_mask_transparent"></div> <div class="weui_toast"> <i class="weui_icon_toast"></i> <p class="weui_toast_content">' + text + '</p> </div>'
    document.body.appendChild(html)
    setTimeout(() => {
      var alertToast = document.querySelector('#' + id)
      alertToast.parentNode.removeChild(alertToast)
    }, 1000)
  }
}
export default Layer
