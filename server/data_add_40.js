
conn = new Mongo();

db = conn.getDB("cloud");

db.instances.drop();

db.instances.save({name:"name1", id:"id1", itype:"type1", state:"state1", az: "az1", publicIP: "1.2.3.4", privateIP:"4.3.2.1"})
db.instances.save({name:"name2", id:"id2", itype:"type2", state:"state2", az: "az2", publicIP: "2.2.3.4", privateIP:"4.3.2.2"})
db.instances.save({name:"name3", id:"id3", itype:"type3", state:"state3", az: "az3", publicIP: "3.2.3.4", privateIP:"4.3.2.3"})
db.instances.save({name:"name4", id:"id4", itype:"type4", state:"state4", az: "az4", publicIP: "4.2.3.4", privateIP:"4.3.2.4"})
db.instances.save({name:"name5", id:"id5", itype:"type5", state:"state5", az: "az5", publicIP: "5.2.3.4", privateIP:"4.3.2.5"})

db.instances.save({name:"name6", id:"id6", itype:"type6", state:"state6", az: "az6", publicIP: "6.2.3.4", privateIP:"4.3.2.6"})
db.instances.save({name:"name7", id:"id7", itype:"type7", state:"state7", az: "az7", publicIP: "7.7.3.4", privateIP:"4.3.7.7"})
db.instances.save({name:"name8", id:"id3", itype:"type3", state:"state3", az: "az3", publicIP: "3.12.3.4", privateIP:"4.3.12.3"})
db.instances.save({name:"name9", id:"id4", itype:"type4", state:"state4", az: "az4", publicIP: "4.12.3.4", privateIP:"4.3.12.4"})
db.instances.save({name:"name10", id:"id5", itype:"type5", state:"state5", az: "az5", publicIP: "5.12.3.4", privateIP:"4.3.2.5"})

db.instances.save({name:"name11", id:"id11", itype:"type11", state:"state11", az: "az11", publicIP: "11.2.3.4", privateIP:"4.3.2.11"})
db.instances.save({name:"name12", id:"id2", itype:"type2", state:"state2", az: "az2", publicIP: "2.2.3.4", privateIP:"4.3.2.2"})
db.instances.save({name:"name13", id:"id3", itype:"type3", state:"state3", az: "az3", publicIP: "3.2.3.4", privateIP:"4.3.2.3"})
db.instances.save({name:"name14", id:"id4", itype:"type4", state:"state4", az: "az4", publicIP: "4.2.3.4", privateIP:"4.3.2.4"})
db.instances.save({name:"name15", id:"id5", itype:"type5", state:"state5", az: "az5", publicIP: "5.2.3.4", privateIP:"4.3.2.5"})

db.instances.save({name:"name16", id:"id16", itype:"type16", state:"state16", az: "az16", publicIP: "16.2.3.4", privateIP:"4.3.2.16"})
db.instances.save({name:"name17", id:"id2", itype:"type2", state:"state2", az: "az2", publicIP: "2.2.3.4", privateIP:"4.3.2.2"})
db.instances.save({name:"name18", id:"id3", itype:"type3", state:"state3", az: "az3", publicIP: "3.2.3.4", privateIP:"4.3.2.3"})
db.instances.save({name:"name19", id:"id4", itype:"type4", state:"state4", az: "az4", publicIP: "4.2.3.4", privateIP:"4.3.2.4"})
db.instances.save({name:"name20", id:"id5", itype:"type5", state:"state5", az: "az5", publicIP: "5.2.3.4", privateIP:"4.3.2.5"})

db.instances.save({name:"name21", id:"id21", itype:"type21", state:"state21", az: "az21", publicIP: "21.2.3.4", privateIP:"4.3.2.21"})
db.instances.save({name:"name22", id:"id2", itype:"type2", state:"state2", az: "az2", publicIP: "2.2.3.4", privateIP:"4.3.2.2"})
db.instances.save({name:"name23", id:"id3", itype:"type3", state:"state3", az: "az3", publicIP: "3.2.3.4", privateIP:"4.3.2.3"})
db.instances.save({name:"name24", id:"id4", itype:"type4", state:"state4", az: "az4", publicIP: "4.2.3.4", privateIP:"4.3.2.4"})
db.instances.save({name:"name25", id:"id5", itype:"type5", state:"state5", az: "az5", publicIP: "5.2.3.4", privateIP:"4.3.2.5"})

db.instances.save({name:"name26", id:"id26", itype:"type26", state:"state26", az: "az26", publicIP: "26.2.3.4", privateIP:"4.3.2.26"})
db.instances.save({name:"name27", id:"id2", itype:"type2", state:"state2", az: "az2", publicIP: "2.2.3.4", privateIP:"4.3.2.2"})
db.instances.save({name:"name28", id:"id3", itype:"type3", state:"state3", az: "az3", publicIP: "3.2.3.4", privateIP:"4.3.2.3"})
db.instances.save({name:"name29", id:"id4", itype:"type4", state:"state4", az: "az4", publicIP: "4.2.3.4", privateIP:"4.3.2.4"})
db.instances.save({name:"name30", id:"id5", itype:"type5", state:"state5", az: "az5", publicIP: "5.2.3.4", privateIP:"4.3.2.5"})

db.instances.save({name:"name31", id:"id31", itype:"type31", state:"state31", az: "az31", publicIP: "31.2.3.4", privateIP:"4.3.2.31"})
db.instances.save({name:"name32", id:"id2", itype:"type2", state:"state2", az: "az2", publicIP: "2.2.3.4", privateIP:"4.3.2.2"})
db.instances.save({name:"name33", id:"id3", itype:"type3", state:"state3", az: "az3", publicIP: "3.2.3.4", privateIP:"4.3.2.3"})
db.instances.save({name:"name34", id:"id4", itype:"type4", state:"state4", az: "az4", publicIP: "4.2.3.4", privateIP:"4.3.2.4"})
db.instances.save({name:"name35", id:"id5", itype:"type5", state:"state5", az: "az5", publicIP: "5.2.3.4", privateIP:"4.3.2.5"})

db.instances.save({name:"name36", id:"id36", itype:"type36", state:"state36", az: "az36", publicIP: "36.2.3.4", privateIP:"4.3.2.36"})
db.instances.save({name:"name37", id:"id2", itype:"type2", state:"state2", az: "az2", publicIP: "2.2.3.4", privateIP:"4.3.2.2"})
db.instances.save({name:"name38", id:"id3", itype:"type3", state:"state3", az: "az3", publicIP: "3.2.3.4", privateIP:"4.3.2.3"})
db.instances.save({name:"name39", id:"id4", itype:"type4", state:"state4", az: "az4", publicIP: "4.2.3.4", privateIP:"4.3.2.4"})
db.instances.save({name:"name40", id:"id5", itype:"type5", state:"state5", az: "az5", publicIP: "5.2.3.4", privateIP:"4.3.2.5"})

cursor = db.instances.find();

while ( cursor.hasNext() ) {
  printjson( cursor.next() );
}
