# \r?\n, don't eat spaces.

# this should be used after the rewriting method to replace line head
# which replaces \r\n with '\n', maybe remove the leading spaces, too

module.exports ->
  @cursor++
  @lineno++
  @setToken '\n', '\n', @cursor-1, @lineno
