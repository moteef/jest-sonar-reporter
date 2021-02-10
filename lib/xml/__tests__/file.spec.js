"use strict";

const xml = require("xml");
const file = require("../file");
const path = require("path");

describe("file", () => {
  test('<file path=""></file>', () => {
    const mock = {
      testFilePath: "test/FooTest.js",
      testResults: [],
    };

    const actualReport = xml(file(mock, { pathOptions: "absolute" }));

    expect(actualReport).toMatchSnapshot();
  });

  test("path value is relative", () => {
    const mock = {
      testFilePath: path.join(process.cwd(), "test", "RelativePathTest.js"),
      testResults: [],
    };

    const actualReport = xml(file(mock, { pathOptions: "relative" }));

    expect(actualReport).toMatchSnapshot();
  });

  test("path value is gitRoot", () => {
    const mock = {
      testFilePath: path.join(
        process.cwd(),
        "src",
        "test",
        "RelativePathTest.js"
      ),
      testResults: [],
    };

    const spy = jest.spyOn(process, "cwd");
    spy.mockReturnValue(path.join(process.cwd(), "src"));

    const actualReport = xml(file(mock, { pathOptions: "gitRoot" }));

    expect(actualReport).toMatchSnapshot();
  });

  test("testCase tag", () => {
    const mock = {
      testFilePath: "test/FooTest.js",
      testResults: [{ title: "lorem ipsum" }, { title: "lorem ipsum" }],
    };

    const actualReport = xml(file(mock, { pathOptions: "absolute" }), true);

    expect(actualReport).toMatchSnapshot();
  });
});
