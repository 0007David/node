Bring in the sanitize-html dependency


Set up a utility function to sanitize incoming data.


Our incoming data is an object.


Iterate over that object and sanitize any strings. Remember to allow the '<b>' tag.


One way to iterate over an object:
  for (const [key, value] of Object.entries(objName)) {
   // do something here
  }


Our function should return the sanitized data.


Probably best to call this function in handlePost()

--- 

Data 

"The Bathroom Mirror Incident"

<button onclick="console.log('hacked')">Click me</button>

It started like every normal Monday: half-asleep, grumbling, and brushing my teeth while scrolling through emails. Then I looked up—and nearly dropped my toothbrush into the sink. My reflection blinked <b>before</b> I did.

I stared. It stared back. I waved. It waved, but about a second late, like a badly synced Zoom call from the afterlife.

Thinking I was just sleep-deprived, I splashed water on my face. When I looked back up, the mirror version of me was scribbling something on the glass from the inside. The letters slowly formed: “Nice hair.” I blinked. Then it added: “Just kidding.”

Insulted by my own ghost, I left the bathroom in a huff and tried to ignore it. But every morning after that, it kept going. “You missed a spot.” “That shirt again?” “Bold of you to try bangs.”

Eventually, I put a sticky note over the mirror that read “Shhh.” Haven’t heard a peep since. But I still refuse to floss in front of it—just in case it starts offering critiques.