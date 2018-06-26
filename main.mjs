import R from 'ramda'

const log = R.curry(console.log)
const flippedConcat = R.flip(R.concat)
const bottlesRef = R.cond([
	[R.equals(1), R.always("1 bottle")],
  [R.equals(0), R.always("No more bottles")],
  [R.T, R.compose(flippedConcat(" bottles"), R.toString)]
])

const storeLine = R.cond([
	[R.equals(0), R.always("Go to the store and buy some more")],
  [R.T, R.always("Take one down and pass it around")]
])

const bottleStr = R.compose(
	flippedConcat(" of beer"),
  bottlesRef
)
const bottlesOnWall = R.compose(flippedConcat(" on the wall"), bottleStr)
const bottlesLeft = R.cond([
  [R.equals(0), R.always(99)],
  [R.T, R.dec]
])
const bottlesLeftOnWall = R.compose(bottlesOnWall, bottlesLeft)

const builderFns = [bottlesOnWall, bottleStr, storeLine, bottlesLeftOnWall]
const verse = R.compose(
  R.join("\n"),
  R.flip(R.map)(builderFns),
	R.applyTo
)

const sing = R.compose(
	log,
  R.join("\n\n"),
  R.map(verse),
  R.reverse,
  R.range(0),
  R.inc
)

sing(99)