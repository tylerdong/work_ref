const fs = require('fs')
const path = require('path')

const root = path.join(__dirname) + '/face/'

fs.readdir(root, (err, files) => {
    let persons = []
    files.forEach(file => {
      if (file.indexOf('.DS_Store') === -1){
        const name = file.split('.')[0]
        persons.push({
          name: name,
          avatar: `./face/${file}`,
          data: {
            company: '',
            title: ''
          }
        })
      }
    })
    fs.writeFile('person.json', JSON.stringify(persons), (err)=>{
      if(err) {
        console.log('写入失败', err);
      } else {
        console.log('导入成功，共导入' + persons.length)
        
      }
    })
})
