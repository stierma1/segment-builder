var chai = require("chai");
var expect = chai.expect;
var Segment = require("../lib/segment");

describe("Segment", () => {

  it("constructs", () => {
    var segment = new Segment({startInclusive:true, endInclusive:true, startPoint:1,endPoint:2});

    expect(segment.startPoint).equals(1);
    expect(segment.endPoint).equals(2);
    expect(segment.startInclusive).equals(true);
    expect(segment.endInclusive).equals(true);
  });

  it("builds from string 0", ()=> {
    var segment = Segment.fromString("[1]-[2]");
    expect(segment.startPoint).equals(1);
    expect(segment.endPoint).equals(2);
    expect(segment.startInclusive).equals(true);
    expect(segment.endInclusive).equals(true);
  })

  it("builds from string 1", ()=> {
    var segment = Segment.fromString("(1)-[2]");
    expect(segment.startPoint).equals(1);
    expect(segment.endPoint).equals(2);
    expect(segment.startInclusive).equals(false);
    expect(segment.endInclusive).equals(true);
  })

  it("builds from string 2", ()=> {
    var segment = Segment.fromString("(1)-(2)");
    expect(segment.startPoint).equals(1);
    expect(segment.endPoint).equals(2);
    expect(segment.startInclusive).equals(false);
    expect(segment.endInclusive).equals(false);
  })

  it("categorizes segment 0", ()=> {
    var segment = Segment.fromString("(1)-(2)");
    var segment2 = Segment.fromString("(1)-(2)");
    expect(segment.categorize(segment2)).equals("contained");
  })

  it("categorizes segment 1", ()=> {
    var segment = Segment.fromString("(1)-(2)");
    var segment2 = Segment.fromString("(-1)-(0)");
    expect(segment.categorize(segment2)).equals("disjoint");
  })

  it("categorizes segment 2", ()=> {
    var segment = Segment.fromString("(1)-(2)");
    var segment2 = Segment.fromString("(0)-(1)");
    expect(segment.categorize(segment2)).equals("joint");
  })

  it("categorizeWithEndpointCheck segment -2", ()=> {
    var segment = Segment.fromString("[1]-(2)");
    var segment2 = Segment.fromString("(1)-(2)");
    expect(segment.categorizeWithEndpointCheck(segment2)).equals("contained");
  })

  it("categorizeWithEndpointCheck segment -1", ()=> {
    var segment = Segment.fromString("[1]-(2)");
    var segment2 = Segment.fromString("[1]-(2)");
    expect(segment.categorizeWithEndpointCheck(segment2)).equals("contained");
  })

  it("categorizeWithEndpointCheck segment 0", ()=> {
    var segment = Segment.fromString("(1)-(2)");
    var segment2 = Segment.fromString("(1)-(2)");
    expect(segment.categorizeWithEndpointCheck(segment2)).equals("contained");
  })

  it("categorizeWithEndpointCheck segment 1", ()=> {
    var segment = Segment.fromString("(1)-(2)");
    var segment2 = Segment.fromString("[1]-(2)");
    expect(segment.categorizeWithEndpointCheck(segment2)).equals("belonging");
  })

  it("categorizeWithEndpointCheck segment 2", ()=> {
    var segment = Segment.fromString("(1)-(2)");
    var segment2 = Segment.fromString("(0)-[1]");
    expect(segment.categorizeWithEndpointCheck(segment2)).equals("disjoint");
  })

  it("categorizeWithEndpointCheck segment 3", ()=> {
    var segment = Segment.fromString("[1]-(2)");
    var segment2 = Segment.fromString("(0)-[1]");
    expect(segment.categorizeWithEndpointCheck(segment2)).equals("joint");
  })

  it("categorizeWithEndpointCheck segment 4", ()=> {
    var segment = Segment.fromString("(1)-(2)");
    var segment2 = Segment.fromString("(0)-(1)");
    expect(segment.categorizeWithEndpointCheck(segment2)).equals("disjoint");
  })
})
