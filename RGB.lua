
color="0000ff"
wifi.setmode(wifi.STATION)


wifi.sta.config("GGG","11112345")
wifi.sta.connect()
tmr.delay(2000000)   -- wait 1,000,000 us = 1 second

print(wifi.sta.getip())

sk=net.createConnection(net.TCP, 0)
    sk:on("receive", function(sck, c) print(c) color=c end )
    tmr.delay(2000000) 
    sk:connect(6969,"162.243.128.32")
    tmr.delay(2000000) 
    sk:send("Hello Server,I am NodeMCU")
 
