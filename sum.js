//Writing a file

import { writeFile, readFile, appendFile, unlink } from "fs";
const quote = "No beauty shines brighter than that of good heart";

writeFile("./awesome.html",quote,(err)=>{
    console.log("completed writting!!!");
});

const quote2 = "Live more,worry less";

for(let i=0;i<10;i++){ 
  writeFile(`./backup/text-${i}.html`,quote2,(err)=>{
    console.log("completed writing");
})
}

// //Task - 2

const [ , , noofFiles] = process.argv;
for(let i=0; i<noofFiles; i++)
{
    writeFile(`./backup/text-${i}.html`,quote2,(err)=>{
        console.log("writting completed");
    });
}

// //How to read a file
readFile("./msg.txt","utf-8",(err,data)=>{
  if(err){
    console.error(err);
  }
  console.log(data);
});

// How to update a file
const quote3 = "Dream without fear love without limits";
appendFile("./awesome.html","\n"+quote3, (err)=>{
  console.log("complete updating!!!");
});

//How to delete a file
unlink("./awesome.html",(err)=>{
  if(err){
    console.log("❌",err);
  }
  else{
    console.log("Deleted Successfully!!!");
  }
})

