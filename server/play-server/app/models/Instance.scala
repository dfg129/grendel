package demo.models

import play.api.libs.json._
import play.modules.reactivemongo.json.collection._

/**
 * This represents the data for a machine instance.
 */
case class Instance(name: String, id: String, itype: String, state: String, az: String, publicIP: String, privateIP: String)

object Instance {

  // these implicitley read and write with type conversion based on the case class above
  implicit val reader: Reads[Instance] = Json.reads[Instance]
  implicit val writer: Writes[Instance] = Json.writes[Instance]

}
