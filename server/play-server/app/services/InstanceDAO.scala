package demo.services

import play.modules.reactivemongo.ReactiveMongoPlugin
import play.modules.reactivemongo.json.collection.JSONCollection
import play.api.Play.current
import scala.concurrent.{Future}
import play.api.libs.json.Json
import reactivemongo.api._
import reactivemongo.core.commands._
import play.api._
import demo.models._
import scala.util.{Success, Failure}
import reactivemongo.bson._
import play.modules.reactivemongo.json.BSONFormats._
import play.api.libs.iteratee._

/**
 * Service object used to access stored data in the form of demo.models.InstanceModel
 */
object InstanceDAO {
  import scala.concurrent.ExecutionContext.Implicits.global

  val driver = new MongoDriver

  // pull config info from application.conf
  // host and port
  val connection = driver.connection(List(Play.current.configuration.getString("db.driver").getOrElse("Could not retrieve db")))
  // database
  val db = connection(Play.current.configuration.getString("db.instance").getOrElse("instance not found"))
  // collection
  val collection = db.collection[JSONCollection](Play.current.configuration.getString("db.collection").getOrElse("collection not found"))

  /**
   * Find all instances
   * @param page starting index
   * @param perPage page size
   */
  def findAll(page: Int, perPage: Int): Future[Seq[Instance]] = {
    collection.find(Json.obj())
    .options(QueryOpts((page - 1) * perPage))
    .sort(Json.obj("_id" -> -1))
    .cursor[Instance]
    .collect[Seq](perPage)
  }

  /**
   * Return a count of all instances
   */
  def count: Future[Int] = {
    db.command(Count(collection.name))
  }
}
