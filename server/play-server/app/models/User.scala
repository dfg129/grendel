package demo.models

import play.api.libs.json._
import play.modules.reactivemongo.json.collection._

case class User(userId: String, userName: String, password: String)

object User {
  implicit val userFormat = Json.format[User]
}
