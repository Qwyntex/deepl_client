import './style.css'
import 'deepl-node'

// language=HTML
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `    
        <div class="row">
            <textarea class="col-sm-6" id="in" oninput="{
                document.getElementById('out').innerHTML = ''        
                if (this.value[this.value.length - 1] !== '\\n')return;
                this.value[this.value.length - 1] = ''
                let txt = this.value
                console.log(txt)
                
                postData()
                async function postData () {
                    
                  let req = {
                    auth_key: '3256b88d-dbaa-773a-30c9-bef443336265:fx',
                    text: txt + '',
                    target_lang: 'EN'  
                  }
                  
                    function body() {
                      let auth_key = 'auth_key=' + req.auth_key
                      let text = 'text=' + req.text
                      let target_lang = 'target_lang=' + req.target_lang
                      return auth_key + '&' + text + '&' + target_lang
                    }
                  
                  const response = await fetch('https://api-free.deepl.com/v2/translate', {
                      body: body(),
                      headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                      },
                      method: 'POST'
                  })
                
                  if (!response.ok) {
                    console.error(response.json())
                    throw new Error('Request failed with status ' + response.status)
                  }
                  
                  console.info('Request successful!')
                  response.json().then(
                      function (value) {
                        document.getElementById('out').innerHTML = value.translations[0].text
                      }
                  )
                }
            }"></textarea>
            <textarea class="col-md-6" id="out"></textarea>
        </div>
`