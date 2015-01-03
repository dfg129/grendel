package demo.models

import play.api.libs.json._
import play.modules.reactivemongo.json.collection._

case class Instance(name: String, id: String, itype: String, state: String, az: String, publicIP: String, privateIP: String)

object Instance {

  implicit val reader: Reads[Instance] = Json.reads[Instance]

  implicit val writer: Writes[Instance] = Json.writes[Instance]

}
