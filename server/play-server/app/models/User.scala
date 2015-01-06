package demo.models

import play.api.libs.json._
import play.modules.reactivemongo.json.collection._

/**
 * This represents the user model stored in the database
 */
case class User(userId: Double, userName: String, password: String)

object User {

  // these are implicit read and write functions performing type conversion based on case class
  implicit val reader: Reads[User] = Json.reads[User]
  implicit val writer: Writes[User] = Json.writes[User]

}
