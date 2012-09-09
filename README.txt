SurfTracker -- Figure out what pages you like and consider related


SurfTracker is a Firefox extension that tracks your page navigations,
and specifically the number of times you traverse links between pages
in your history.  Using SurfTracker, you can discover what pages you
consider interesting and related, and check your browsing habits.

SurfTracker monitors a given set of domains that you specify in its
filters.  When you visit a page that falls in one of these domains,
SurfTracker will keep track of the navigations you make between pages
in the domain and builds a surf graph customized for you.  Nodes
correspond to webpages and directed links correspond to hyperlinks you
used to navigate between them.  For example, if you are on page X and
you click a link to page Y, SurfTracker will make a new link in its
surfing graph from node X to node Y.  Each link has a count associated
with it, so if you traverse the same link later, the count is
incremented rather than making a new link.  Only links between nodes
in a monitored domain are captured.

After surfing for a while, SurfTracker will have for each monitored
domain a surfing graph with links weighted by the number of times you
navigated the link.  SurfTracker can then visualize the graph for you
so you can see the pages that you frequently visit and navigate within
each domain.  In this way you can discover your browsing habits as
well as the relationships that you consider important, as measured by
the links between pages that you traverse.

I created this extensions because I spend way too much time reading
Wikipedia in my spare time, and I wanted to know and quantify which
topics I found most interesting, and why I found them interesting.  By
creating this graph and visually performing operations such as clique
finding, I could easily find the topics I visited more frequently, and
the relationships I frequently traversed.  This is a very personalized
measure of relatedness and is better for a single person than using
measures such as measuring the size of intersection of each page's
links, since such data is notoriously sparse.  In other words, two
pages that may be highly related would indeed link to some of the same
pages, but those pages would be very general and hence related to a
ton of other things.  Also, some of the most interesting pages (at
least for me) are linked only in the "See also" section, and sometimes
I click them only because the name sounds interesting.  By making this
I could discover why I consider those topics related and what they
have in common.


Michael Lieberman
mike.d.lieberman@gmail.com

