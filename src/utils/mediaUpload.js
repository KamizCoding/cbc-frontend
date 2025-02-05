import { createClient } from "@supabase/supabase-js"

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtcGhzZ3J1ZWxsZXZmb2R5ZHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NDM3MTgsImV4cCI6MjA1NDMxOTcxOH0.nsHRQO40FET8geOj6QJjc-z3RlUx6TrD_XLS4n8UM04`

const url = "https://pmphsgruellevfodydyh.supabase.co"

export default function uploadMediaToSupabase(file){
    
    return new Promise(
        (resolve,reject)=>{
            if(file == null){
                reject("Please select a file");
            }
            
            let fileName = file.name
            const extension = fileName.split(".")[fileName.split(".").length-1];

            const supabase = createClient(url,key);

            const timestamp = new Date().getTime();

            fileName = timestamp + file.name + "." + extension;

            supabase.storage.from("images").upload(fileName,file,{
                cacheControl : "3600",
                upsert : false,
            }).then(()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                resolve (publicUrl);
            }).catch((err)=>{
                reject(err);
            });
        }
    );
}
