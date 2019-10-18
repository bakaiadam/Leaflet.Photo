import subprocess
import os
import json

s=[]
i=0
for filename in os.listdir("."):
    if (not filename.startswith("thumbnail") )  and (filename.endswith("JPG") or filename.endswith("PNG") or filename.endswith("jpg") or filename.endswith("png") ): 
#        print(os.path.join("q", filename))
        g=subprocess.getoutput('exiftool -c "%.6f"  "'+filename+'"|egrep "GPS Position"')
#        print(g)
        h={}
        g2=g.split()
        if (len(g2)<6):
          continue
        #print("g2:"+filename,filename.startswith("thumbnail") )
        #print(g2)
        h["lat"]=g2[3]
        h["lng"]=g2[5]
        h["url"]="photos/"+filename
        filename2, file_extension2 = os.path.splitext(filename)
        thumbname="thumbnail"+str(i)+file_extension2
        h["thumbnail"]="photos/"+thumbname
        h["name"]=""

        g=subprocess.getoutput('exiftool -c "%.6f" -d "%s" "'+filename+'"|fgrep "GPS Date/Time"')
        g2=g.split()
        if (len(g2)<4):
          continue
        h["date"]=g2[3]
        
#        print('convert -thumbnail 80 '+filename+' thumbnail'+str(i)+file_extension2)
        g=subprocess.getoutput('convert -thumbnail 80 "'+filename+'" "'+thumbname+'"')
        #g=subprocess.getoutput('cp "'+filename+'" thumbnail'+str(i)+file_extension2+';sync')
        i+=1
#        if (i==3):
#          break
        
        s.append(h)
        continue
    else:
        continue

s=sorted(s, key = lambda i: i['date']) 

print("var photos="+json.dumps(s, indent=4)+";")        

