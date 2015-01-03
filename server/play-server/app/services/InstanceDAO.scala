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


object InstanceDAO {
  import scala.concurrent.ExecutionContext.Implicits.global

  val driver = new MongoDriver
  val connection = driver.connection(List("localhost:27017"))
  val db = connection("cloud")
  val collection = db.collection[JSONCollection]("instances")


  def findAll(page: Int, perPage: Int): Future[Seq[Instance]] = {
    collection.find(Json.obj())
    .options(QueryOpts((page - 1) * perPage))
    .sort(Json.obj("_id" -> -1))
    .cursor[Instance]
    .collect[Seq](perPage)
  }


  def count: Future[Int] = {
    db.command(Count(collection.name))
  }
}
