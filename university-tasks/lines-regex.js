/**
 * Created by Liudmila Kornilova
 * on 19.05.17
 */

let testsSucceeded = 0;
let testsFailed = 0;

/*
TESTS
 */

/*
Delete punctuation and spaces in the beginning of line
 */
requireEquals(beautifyLine(".a"),
                           "a");

requireEquals(beautifyLine(" . !?a"),
                           "a");

/*
Process sequences starting with '.'
 */
requireEquals(beautifyLine("a..."),
                           "a...");

requireEquals(beautifyLine("a...a"),
                           "a... a");

requireEquals(beautifyLine("a...,? ?! ! a"),
                           "a... a");

requireEquals(beautifyLine("a..,? ?! ! a"),
                           "a. a");

requireEquals(beautifyLine("a..,? ?! ! "),
                           "a.");

requireEquals(beautifyLine("a.,..,? ?! ! a"),
                           "a., a");

requireEquals(beautifyLine("a. ..,? ?! ! a"),
                           "a. a");

requireEquals(beautifyLine("a... ... a"),
                           "a... a");

/*
Process sequences starting with '!'
 */
requireEquals(beautifyLine("a!"),
                           "a!");

requireEquals(beautifyLine("a!!"),
                           "a!");

requireEquals(beautifyLine("a!! "),
                           "a!");

requireEquals(beautifyLine("a!... ... a"),
                           "a!.. a");

requireEquals(beautifyLine("a!..."),
                           "a!..");

requireEquals(beautifyLine("a!?..."),
                           "a!");

/*
Process sequences starting with '?'
 */
requireEquals(beautifyLine("a?"),
                           "a?");

requireEquals(beautifyLine("a?.."),
                           "a?..");

requireEquals(beautifyLine("a?!. .. "),
                           "a?!");

requireEquals(beautifyLine("a?!.. .a"),
                           "a?! a");

/*
Delete spaces before punctuation
 */
requireEquals(beautifyLine("a ?"),
                           "a?");

requireEquals(beautifyLine("a abc a? !a?"),
                           "a abc a? a?");

requireEquals(beautifyLine("a . a."),
                           "a. a.");

requireEquals(beautifyLine("a ! .."),
                           "a!");

/*
Delete duplicate spaces
 */
requireEquals(beautifyLine("a    b"),
                           "a b");

requireEquals(beautifyLine("a    bcd e ."),
                           "a bcd e.");

/*
Delete all punctuation and spaces before closing quote
*/
requireEquals(beautifyLine('"a bd . e."'),
                           '"a bd. e"');

requireEquals(beautifyLine('"a bd . e. ? ! .." a'),
                           '"a bd. e" a');

/*
Dash has only one preceding and following space
*/
requireEquals(beautifyLine('a—b'),
                           'a — b');

requireEquals(beautifyLine('—ab'),
                           '— ab');

/*
More complicated tests
 */

requireEquals(beautifyLine(".a!... ?  bc de. ?fg h !.. ..."),
                           "a!.. bc de. fg h!..");

requireEquals(beautifyLine(" a..!.? b??cde?! f!?.. e   "),
                           "a. b? cde?! f! e");



printResult();

function requireEquals(line1, line2) {
    if (line1 !== line2) {
        console.error("Test failed! \"" + line1 + "\" !== \"" + line2 + "\"");
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

    let out = line;

    // dash has only one preceding space
    out = out.replace(/ *(?=—)/g, ' ');

    // dash has only one following space
    out = out.replace(/— */g, '— ');

    //Delete punctuation and spaces in the beginning of line
    out = out.replace(/^[.,!? ]+/g, '');

    //    Delete all punctuation and spaces before closing quote
    out = out.replace(/([ .,!?])*([.,!?])(?=")/g, '');

    /*
    Process sequences starting with '.':
    .
    .,
    ...
    find '.' which is not preceded by punctuation and
    followed by '..' or ',' or neither
     */
    out = out.replace(/([^?!.,]\.(?:(?:\.{2})|(?:,))?)(?:[., ?!]*)/g, "$1 ");

    /*
    Process sequences starting with '?':
    ?
    ?!
    ?..
     */
    out = out.replace(/([^?!.,]\?(?:(?:\.\.)|!)?)(?:[., ?!]*)/g, "$1 ");

    /*
    Process sequences starting with '!':
    !
    !..
     */
    out = out.replace(/([^?!.,]!(?:\.\.)?)(?:[., ?!]*)/g, "$1 ");

    //    Delete spaces before punctuation
    out = out.replace(/ +(?=[.,!?])/g, '');

    //    Delete duplicate spaces
    out = out.replace(/ +/g, ' ');

    //    Delete spaces at the end of line
    out = out.replace(/ +$/g, '');

    return out;
}

