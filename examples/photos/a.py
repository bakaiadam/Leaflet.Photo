import subprocess
import os
import json

s=[]

for filename in os.listdir("."):
    if (not filename.startswith("thumbnail") )  and (filename.endswith("JPG") or filename.endswith("PNG") or filename.endswith("jpg") or filename.endswith("png") ): 
        # print(os.path.join(directory, filename))
        g=subprocess.getoutput('exiftool -c "%.6f"  "'+filename+'"|egrep "GPS Position"')
        #print(g)
        h={}
        g2=g.split()
        #print("g2:"+filename,filename.startswith("thumbnail") )
        #print(g2)
        h["lat"]=g2[3]
        h["lng"]=g2[5]
        h["url"]="photos/"+filename
        h["thumbnail"]="photos/thumbnail"+filename
        h["name"]=""

        g=subprocess.getoutput('exiftool -c "%.6f" -d "%s" "'+filename+'"|fgrep "GPS Date/Time"')
        g2=g.split()
        h["date"]=g2[3]
        
        g=subprocess.getoutput('convert -thumbnail 80 '+filename+' thumbnail'+filename)
        
        s.append(h)
        continue
    else:
        continue
print("var photos="+json.dumps(s, indent=4)+";")        

