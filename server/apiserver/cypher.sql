START weibo=node:weibo(name = "很破滴一口钟"), account=node(1)
CREATE UNIQUE account-[r:HAS_WEIBO]->weibo
RETURN r;


START weibo=node:weibo(name = "很破滴一口钟"), account=node(1)
RETURN weibo,account;

START account=node(1)
RETURN account;


START account=node(1)
MATCH account-[:HAS_WEIBO]->weibo
RETURN weibo;


START n = node(3)
MATCH n-[r]-()
DELETE n, r


START account=node(1), weibo=node:weibo(name = "很破滴一口钟")
MATCH account-[r:HAS_WEIBO]->weibo
RETURN weibo, r

CREATE INDEX ON :Weibo(name)

START weibo=node:Weibo(name="a1") 
RETURN weibo

CREATE INDEX ON :Weibo(name)

MATCH weibo:Weibo
WHERE weibo.name="a1"
WITH count(weibo) as c 
WHERE c=0 
CREATE (weibo:Weibo{name:"a1"})
RETURN c, weibo


CREATE (weibo1:Weibo{name:"a11"})
CREATE (weibo2:Weibo{name:"a12"})
CREATE weibo2-[r:friends]->weibo1
SET weibo1.weiboid=ID(weibo1)
SET weibo2.weiboid=ID(weibo2)
RETURN weibo1,weibo2


START weibo=node(58)
MATCH weibo-[r:HAS_POST]->post
WITH post, count(post) as c 
RETURN post
ORDER BY post.time DESC
SKIP 0
LIMIT 5

START weibo=node(58)
MATCH weibo-[r:HAS_POST]->post
DELETE post,r;
ORDER BY n.age


START weibo=node(58)
MATCH weibo:Weibo-[r:HAS_POST]->post:Post
RETURN post
UNION ALL MATCH weibo:Weibo-[r:HAS_POST]->post:Post
WHERE weibo.name = '希尔伯特的空间'
RETURN count(post) AS post


MATCH weibo:Weibo-[r:HAS_POST]->post
SET post :Post
RETURN post




MATCH weibo:Weibo-[r:HAS_POST]->post:Post
WHERE weibo.name = '希尔伯特的空间'
RETURN count(post) AS post
UNION ALL
START weibo=node(58)
MATCH weibo:Weibo-[r:HAS_POST]->post:Post
RETURN post


MATCH weibo:Weibo-[r:HAS_POST]->post:Post
WHERE post.status="publishing"
RETURN post, weibo
ORDER BY post.time
LIMIT 5