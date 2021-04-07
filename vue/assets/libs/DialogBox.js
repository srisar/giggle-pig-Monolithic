export class AlertDialog {

    constructor(params = {message: '', title: '', id: ''}, closeCallback) {

        params.id = params.id ?? 'ss-dialog-box-modal'
        params.title = params.title ?? 'Alert'
        params.message = params.message ?? ''

        let element = document.createElement('div')
        element.id = 'ss-modal-dialog-container'

        element.innerHTML = `
                <div class="modal fade" id="${params.id}" tabindex="-1" aria-labelledby="" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <p class="modal-title text-uppercase">${params.title}</p>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        ${params.message}
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>`

        document.body.appendChild(element)

        let myAlertModal = new bootstrap.Modal(document.getElementById(params.id), {backdrop: true})
        myAlertModal.show()

        document.getElementById(params.id).addEventListener('hide.bs.modal', function () {
            document.getElementById('ss-modal-dialog-container').remove()
            if (closeCallback !== undefined) {
                closeCallback()
            }
        })
    }
}


export class PromptDialog {

    constructor(params = {message: '', title: '', id: '', multiLine: false}, okButtonCallback, closeCallback) {

        params.id = params.id ?? 'ss-prompt-box-modal'
        params.title = params.title ?? 'Prompt'
        params.message = params.message ?? ''
        params.multiLine = params.multiLine ?? false

        let element = document.createElement('div')
        element.id = 'ss-modal-dialog-container'

        let inputField = '<input type="text" class="form-control" id="ss-prompt-input-value">'
        if (params.multiLine) inputField = '<textarea rows="5" class="form-control" id="ss-prompt-input-value"></textarea>'

        element.innerHTML = `
                <div class="modal fade" id="${params.id}" tabindex="-1" aria-labelledby="" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <p class="modal-title text-uppercase">${params.title}</p>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        ${params.message}
                        ${inputField}
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-success" id="ss-button-prompt-ok">Ok</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>`

        document.body.appendChild(element)

        let myPromptDialog = new bootstrap.Modal(document.getElementById(params.id), {backdrop: 'static'})
        myPromptDialog.show()

        document.addEventListener("click", (e) => {
            if (e.target && e.target.id === 'ss-button-prompt-ok') {
                let value = document.getElementById('ss-prompt-input-value').value
                okButtonCallback(value)

                myPromptDialog.hide()
            }
        })

        document.getElementById(params.id).addEventListener('hide.bs.modal', function () {
            document.getElementById('ss-modal-dialog-container').remove()
            if (closeCallback !== undefined) {
                closeCallback()
            }
        })
    }
}
