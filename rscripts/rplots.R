library(ggplot2)

good = rexp(1700, 1.3)
bad = rnorm(300, 10, 4)
all = c(good, bad)
print(mean(all))
all[all > 10] = 10
all = floor(all)
all = data.frame(all = all)

jpeg('prdistr.jpg')
p <- ggplot(all) + geom_histogram(aes(x = all, color = all, fill = ifelse(all>6, 'big', 'small')),  binwidth = 1, origin = -0.5) +scale_x_discrete(breaks = seq(0,10), labels = c('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '>10'), limits = seq(0, 10)) + scale_fill_manual(values = c('firebrick', 'navyblue')) + theme(legend.position = 'none') + scale_color_manual(values = c('white')) + xlab('# acquaintances in prison') + theme(text=element_text(size=25))
print(p)
dev.off()
