
var SpatialRelationships = require("spatial-relationships-169");
var segmentRegex = /^(\(|\[)([^\)^\]]+)(\)|\])\-(\(|\[)([^\)^\]]+)(\)|\])$/
var number = /^(\-?[0-9\.]+)$/;

class Segment{
  constructor({startInclusive, endInclusive, startPoint, endPoint}){
      this.startInclusive = startInclusive;
      this.endInclusive = endInclusive;
      this.startPoint = startPoint;
      this.endPoint = endPoint;
  }

  relate(segment){
    return SpatialRelationships.relate(this.startPoint, this.endPoint, segment.startPoint, segment.endPoint);
  }

  categorize(segment){
    return SpatialRelationships.categorize(this.relate(segment));
  }

  categorizeWithEndpointCheck(segment){
    var category = this.categorize(segment);

    if(category === "joint"){
      if((this.startInclusive &&  segment.endInclusive  && this.startPoint === segment.endPoint) ||
        (this.endInclusive && segment.startInclusive && this.endPoint === segment.startPoint)){
          return category;
      } else {
        return "disjoint";
      }
    }

    if(category === "contained"){
      if((!this.startInclusive && segment.startInclusive && this.startPoint === segment.startPoint) ||
        (!this.endInclusive && segment.endInclusive && this.endPoint === segment.endPoint)){
          return "belonging"
        } else {
          return category;
        }
    }

    return category;
  }

  contains(point){
    return (this.startPoint < point && this.endPoint > point) ||
    (this.startPoint === point && this.startInclusive) ||
    (this.endPoint === point && this.endInclusive);
  }

  static fromString(str){
    var match = segmentRegex.exec(str);
    if(match){
      var startInclusive = match[1] === "[";
      var startPoint = number.test(match[2]) ? parseFloat(match[2]) : match[2];
      var endInclusive = match[4] === "[";
      var endPoint = number.test(match[5]) ? parseFloat(match[5]) : match[5];

      return new Segment({startInclusive, endInclusive, startPoint, endPoint});
    }

  }
}

module.exports = Segment;
