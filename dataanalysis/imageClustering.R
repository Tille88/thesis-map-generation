# Stealing some code from https://search4fan.github.io/post/r_AI_cluster_by_k-means.html
library("png")
library("ggplot2")
setwd("/Users/jontil/Development/Thesis/thesis-map-generation/assets/basemap/")
img <- readPNG("greenwhich.png") 


imgDm <- dim(img)
# imgDm # [1]  879 1200    3
imgRGB <- data.frame(
  x = rep(1:imgDm[2], each = imgDm[1]), 
  y = rep(imgDm[1]:1, imgDm[2]), 
  R = as.vector(img[,,1]),
  G = as.vector(img[,,2]),
  B = as.vector(img[,,3]),
  A = as.vector(img[,,4])
)


kClusters <- 10 
kMeans <- kmeans(imgRGB[,c("R","G","B")], centers  = kClusters)
kColours <- rgb(kMeans$centers[kMeans$cluster,])
unique(kColours)

kMeans$centers
# ggplot(data = imgRGB, aes(x = x, y = y)) +
#   geom_point(colour = kColours) + 
#   labs(title = paste("k-Means Clustering of", kClusters, "Colours")) + 
#   xlab("x") + 
#   ylab("y")
