


color="12abff"
rgb={}
c={}
c["a"]=10;
c["b"]=11;
c["c"]=12;
c["d"]=13;
c["e"]=14;
c["f"]=15;


for i=1,6 do
    aaa=string.sub(color,i,i)
    if(tonumber(aaa)==nil) then
        rgb[i]=c[aaa]
   else
        rgb[i]=tonumber(aaa)
   end
    print(rgb[i])
end

R=rgb[1]*16+rgb[2]
G=rgb[3]*16+rgb[4]
B=rgb[5]*16+rgb[6]
