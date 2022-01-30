## `analysis`

Much as executed code should be separated from code that is called, the analysis of your data should be separate from the processing. In this folder,you should have a collection of scripts and/or notebooks that use preprocessed data to draw conclusions or calculate quantities that will be reported. Typically, I perform my "analysis" in Python, but you could also use R or any other language that you are comfortable with.

Processing of raw data is the bottle neck of most journalism projects; finding data, cleaning it, tidying it and so forth are quite time-consuming. Processing images or running simulations can also take considerable amounts of time. While you may fiddle with different ways of analyzing your data (once you have an idea of how to answer your scientific question), you usually don't want to reprocess everything you've taken thus far.

By following this structure, the creating, transformation, and interpretation of data are kept separate and clear to anyone trying to follow your thought process. 
