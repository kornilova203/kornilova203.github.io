/**
 * Created by Liudmila Kornilova
 * on 19.05.17
 */

let testsSucceeded = 0;
let testsFailed = 0;

requireEquals(beautifyLine("..."), "...");
requireEquals(beautifyLine("a..."), "a...");
requireEquals(beautifyLine("a...a"), "a... a");
requireEquals(beautifyLine("a...,? ?! ! a"), "a... a");
requireEquals(beautifyLine("a..,? ?! ! a"), "a. a");
requireEquals(beautifyLine("a..,? ?! ! "), "a.");
requireEquals(beautifyLine("a.,..,? ?! ! a"), "a., a");
requireEquals(beautifyLine("a. ..,? ?! ! a"), "a. a");

printResult();

function requireEquals(line1, line2) {
    if (line1 !== line2) {
        console.error("Test failed! " + line1 + " !== " + line2);
        testsFailed++;
    } else {
        testsSucceeded++;
    }
}

function printResult() {
    console.log("Tests failed: " + testsFailed);
    console.log("Tests succeeded: " + testsSucceeded);
}

function beautifyLine(line) {
    line = line.replace(/([^?!.,]\.(?:(?:\.{2})|(?:,))?)(?:[., ?!]*)(.)?/g, (fullMatch, dots, symbolAfterPunctuation) => {
        if (symbolAfterPunctuation === undefined) {
            return dots;
        }
        return dots + ' ' + symbolAfterPunctuation;
    });
    return line;
}

