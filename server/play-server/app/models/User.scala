package demo.models

import play.api.libs.json._
import play.modules.reactivemongo.json.collection._

case class User(userId: Double, userName: String, password: String)

object User {

  implicit val reader: Reads[User] = Json.reads[User]

  implicit val writer: Writes[User] = Json.writes[User]

}
